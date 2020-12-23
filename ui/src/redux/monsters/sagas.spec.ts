import { Action } from 'redux'
import { testSaga } from 'redux-test-saga'
import { fetchMonster, fetchMonsters } from '../../services/monsters'
import Category from '../categories/Category'
import { selectCategory } from '../categories/selectors'
import HitDice from '../hitDice/HitDice'
import { selectHitDice } from '../hitDice/selectors'
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
    techniques: []
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
        it('handles happy path', () => {
            const monsterId = 'john'

            const expected = {
                monster: {
                    id: monsterId,
                    hitDice: 0.5,
                    category: 'brute'
                } as Monster,
                hitDice: { id: '0-5' } as HitDice,
                category: { id: 'brute' } as Category,
                viewModel: { id: monsterId } as MonsterViewModel
            }

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(monsterId)
            )
                .put(setSelectedMonsterLoading())
                .call(fetchMonster, monsterId)
                .result(expected.monster)
                .put(setSelectedMonster(expected.monster))
                .put(buildViewModel())
                .done()
        })

        it('handles missing monster id', () => {
            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(undefined)
            )
                .put(setMonsterViewModel(undefined))
                .done()
        })

        it('handles request errors', () => {
            const expected = new Error('Something bad happened')

            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster('test')
            )
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
            .call(mapMonster, expected.monster, expected.hitDice, expected.category)
            .result(expected.viewModel)
            .put(setMonsterViewModel(expected.viewModel))
            .done()
        })

        it('handles unexected errors', () => {
            const expected = new Error('Something bad happened')

            testSaga(buildViewModelSaga as (action: Action) => Generator, buildViewModel())
                .select(selectSelectedMonster)
                .throw(expected)
                .put(setMonsterError(expected.message))
                .done()
        })

        it('handles situation where no monster is selected', () => {
            testSaga(buildViewModelSaga as (action: Action) => Generator, buildViewModel())
                .select(selectSelectedMonster)
                .result(undefined)
                .put(setMonsterViewModel(undefined))
                .done()
        })
    })

    describe('selectMonsterCategorySaga', () => {
        it('handles happy path', () => {
            const expected = 'leader'

            testSaga(selectMonsterCategorySaga as (action: Action) => Generator, selectMonsterCategory(expected))
                .put(setSelectedMonsterCategory(expected))
                .put(buildViewModel())
                .done()
        })

        it('handles unexected errors', () => {
            const expected = new Error('Something bad happened')

            testSaga(selectMonsterCategorySaga as (action: Action) => Generator, selectMonsterCategory('leader'))
                .put(setSelectedMonsterCategory('leader'))
                .throw(expected)
                .put(setMonsterError(expected.message))
                .done()
        })
    })
})
