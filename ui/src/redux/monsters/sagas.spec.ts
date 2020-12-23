import { Action } from 'redux'
import { testSaga } from 'redux-test-saga'
import { fetchMonster, fetchMonsters } from '../../services/monsters'
import Category from '../categories/Category'
import { selectCategory } from '../categories/selectors'
import HitDice from '../hitDice/HitDice'
import { selectHitDice } from '../hitDice/selectors'
import {
    requestMonsterList,
    selectMonster,
    setMonsterError,
    setMonsterList,
    setSelectedMonster,
    setSelectedMonsterLoading
} from '../monsters/actions'
import { mapMonster } from './mapMonster'
import Monster from './Monster'
import MonsterViewModel from './MonsterViewModel'
import { requestMonsterListSaga, selectMonsterSaga } from './sagas'

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
                .put(setSelectedMonster(expected.viewModel))
                .done()
        })

        it('handles missing monster id', () => {
            testSaga(
                selectMonsterSaga as (action: Action) => Generator,
                selectMonster(undefined)
            )
                .put(setSelectedMonster(undefined))
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
})
