import { Action } from 'redux'
import { testSaga } from 'redux-test-saga'
import { fetchMonster, fetchMonsters } from '../../services/monsters'
import { requestCategories } from '../categories/actions'
import { SET_CATEGORIES_LOOKUP } from '../categories/actionTypes'
import Category from '../categories/Category'
import { selectCategories, selectCategory } from '../categories/selectors'
import { requestHitDice } from '../hitDice/actions'
import { SET_HIT_DICE_LOOKUP } from '../hitDice/actionTypes'
import HitDice from '../hitDice/HitDice'
import { selectHitDice, selectAllHitDice } from '../hitDice/selectors'
import {
    buildViewModel,
    requestMonsterList,
    selectMonster,
    selectMonsterCategory,
    setMonsterError,
    setMonsterList,
    setMonsterViewModel,
    setSelectedMonster,
    setSelectedMonsterCategory,
    setSelectedMonsterLoading
} from '../monsters/actions'
import { SET_MONSTER_ERROR } from './actionTypes'
import { CategoryType } from './CategoryType'
import { mapMonster } from './mapMonster'
import Monster from './Monster'
import MonsterViewModel from './MonsterViewModel'
import {
    buildViewModelSaga,
    requestMonsterListSaga,
    selectMonsterCategorySaga,
    selectMonsterSaga
} from './sagas'
import { selectSelectedMonster } from './selectors'

const buildMonster = (): Monster => ({
    id: 'id',
    name: 'name',
    description: 'description',
    speed: 30,
    category: 'brute',
    attack: 'str',
    defence: 'con',
    hitDice: 0.5,
    techniques: [],
    hitDiceMod: 0,
    altSpeed: 0,
    numberAppearing: 'd4'
})

describe('monster sagas', () => {
    let original = console.error

    beforeEach(() => {
        console.error = jest.fn()
    })

    afterEach(() => {
        console.error = original
    })

    describe('requestMonsterListSaga', () => {
        it('handles happy path', () => {
            const expected = [
                { ...buildMonster(), id: 'goblin', name: 'Goblin' },
                { ...buildMonster(), id: 'spider', name: 'Spider' },
                { ...buildMonster(), id: 'mange-tout', name: 'Mange Tout' }
            ]

            testSaga(requestMonsterListSaga, requestMonsterList())
                .call(fetchMonsters)
                .result(expected)
                .put(setMonsterList(expected))
        })

        it('handles request errors', () => {
            const expected = new Error('Something bad happened')

            testSaga(requestMonsterListSaga, requestMonsterList())
                .call(fetchMonsters)
                .throw(expected)
                .put(setMonsterError(expected.message))
                .done()

            expect(console.error).toBeCalledWith(expected)
        })
    })

    describe('selectMonsterSaga', () => {
        const buildMonster = (monsterId: string) => ({
            monster: {
                id: monsterId,
                hitDice: 0.5,
                category: 'brute'
            } as Monster,
            hitDice: { id: '0-5' } as HitDice,
            category: { id: 'brute' } as Category,
            viewModel: { id: monsterId } as MonsterViewModel
        })

        it('handles happy path', () => {
            const monsterId = 'john'
            const expected = buildMonster(monsterId)

            const nonEmptyArray = [{}]

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(monsterId)
            )
                .select(selectCategories)
                .result(nonEmptyArray)
                .select(selectAllHitDice)
                .result(nonEmptyArray)
                .put(setSelectedMonsterLoading())
                .call(fetchMonster, monsterId)
                .result(expected.monster)
                .put(setSelectedMonster(expected.monster))
                .put(buildViewModel())
                .done()
        })

        it('fetches categories first if necessary', () => {
            const monsterId = 'john'
            const expected = buildMonster(monsterId)

            const nonEmptyArray = [{}]

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(monsterId)
            )
                .select(selectCategories)
                .result([])
                .select(selectAllHitDice)
                .result(nonEmptyArray)
                .put(requestCategories())
                .take([SET_CATEGORIES_LOOKUP, SET_MONSTER_ERROR])
                .put(setSelectedMonsterLoading())
                .call(fetchMonster, monsterId)
                .result(expected.monster)
                .put(setSelectedMonster(expected.monster))
                .put(buildViewModel())
                .done()
        })

        it('fetches hit dice first if necessary', () => {
            const monsterId = 'john'
            const expected = buildMonster(monsterId)

            const nonEmptyArray = [{}]

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(monsterId)
            )
                .select(selectCategories)
                .result(nonEmptyArray)
                .select(selectAllHitDice)
                .result([])
                .put(requestHitDice())
                .take([SET_HIT_DICE_LOOKUP, SET_MONSTER_ERROR])
                .put(setSelectedMonsterLoading())
                .call(fetchMonster, monsterId)
                .result(expected.monster)
                .put(setSelectedMonster(expected.monster))
                .put(buildViewModel())
                .done()
        })

        it('handles missing monster id', () => {
            const nonEmptyArray = [{}]

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(undefined)
            )
                .select(selectCategories)
                .result(nonEmptyArray)
                .select(selectAllHitDice)
                .result(nonEmptyArray)
                .put(setMonsterViewModel(undefined))
                .done()
        })

        it('handles request errors', () => {
            const nonEmptyArray = [{}]

            const expected = new Error('Something bad happened')

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster('test')
            )
                .select(selectCategories)
                .result(nonEmptyArray)
                .select(selectAllHitDice)
                .result(nonEmptyArray)
                .put(setSelectedMonsterLoading())
                .call(fetchMonster, 'test')
                .throw(expected)
                .put(setMonsterError(expected.message))
                .done()

            expect(console.error).toBeCalledWith(expected)
        })
    })

    describe('buildViewModelSaga', () => {
        it('handles happy path', () => {
            const expected = {
                monster: {
                    id: 'monster',
                    hitDice: 0.5,
                    category: 'brute'
                } as Monster,
                hitDice: { id: '0-5' } as HitDice,
                category: { id: 'brute' } as Category,
                viewModel: { id: 'monster' } as MonsterViewModel
            }

            testSaga(
                buildViewModelSaga as (action: Action) => Generator,
                buildViewModel()
            )
                .select(selectSelectedMonster)
                .result(expected.monster)
                .select(selectHitDice, expected.monster.hitDice.toString())
                .result(expected.hitDice)
                .select(selectCategory, expected.monster.category)
                .result(expected.category)
                .call(
                    mapMonster,
                    expected.monster,
                    expected.hitDice,
                    expected.category
                )
                .result(expected.viewModel)
                .put(setMonsterViewModel(expected.viewModel))
                .done()
        })

        it('handles unexected errors', () => {
            const expected = new Error('Something bad happened')

            testSaga(
                buildViewModelSaga as (action: Action) => Generator,
                buildViewModel()
            )
                .select(selectSelectedMonster)
                .throw(expected)
                .put(setMonsterError(expected.message))
                .done()
        })

        it('handles situation where no monster is selected', () => {
            testSaga(
                buildViewModelSaga as (action: Action) => Generator,
                buildViewModel()
            )
                .select(selectSelectedMonster)
                .result(undefined)
                .put(setMonsterViewModel(undefined))
                .done()
        })
    })

    describe('selectMonsterCategorySaga', () => {
        it('handles happy path', () => {
            const expected = 'leader'

            testSaga(
                selectMonsterCategorySaga as (action: Action) => Generator,
                selectMonsterCategory(expected)
            )
                .put(setSelectedMonsterCategory(expected))
                .put(buildViewModel())
                .done()
        })

        it('handles unexected errors', () => {
            const expected = new Error('Something bad happened')

            testSaga(
                selectMonsterCategorySaga as (action: Action) => Generator,
                selectMonsterCategory('leader')
            )
                .put(setSelectedMonsterCategory('leader'))
                .throw(expected)
                .put(setMonsterError(expected.message))
                .done()
        })
    })
})
