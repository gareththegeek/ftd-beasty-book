import {
    setMonsterError,
    setMonsterList,
    setMonsterViewModel,
    setSelectedMonster,
    setSelectedMonsterCategory,
    setSelectedMonsterLoading
} from './actions'
import Monster from './Monster'
import MonstersState from './MonstersState'
import MonsterViewModel from './MonsterViewModel'
import reducer from './reducer'

describe('monster reducer', () => {
    it('returns initial state by default', () => {
        const actual = reducer(undefined, { type: 'default' })

        expect(actual).toEqual({
            all: [],
            selectedMonster: undefined,
            viewModel: undefined,
            loading: false,
            error: undefined
        })
    })

    describe('SET_MONSTER_LIST', () => {
        it('updates monsters.all', () => {
            const expected = [
                { id: 'one' } as Monster,
                { id: 'two' } as Monster,
                { id: 'three' } as Monster
            ]

            const actual = reducer(undefined, setMonsterList(expected))

            expect(actual.all).toEqual(expected)
        })

        it('stops loading and clears errors and selected monster but not viewmodel', () => {
            const actual = reducer(
                {
                    all: [],
                    loading: true,
                    error: 'this is an error',
                    selectedMonster: {} as Monster,
                    viewModel: {} as MonsterViewModel
                } as MonstersState,
                setMonsterList([])
            )

            expect(actual.loading).toEqual(false)
            expect(actual.error).toBeUndefined()
            expect(actual.viewModel).not.toBeUndefined()
            expect(actual.selectedMonster).toBeUndefined()
        })
    })

    describe('SET_MONSTER_VIEW_MODEL', () => {
        it('sets the selected monster view model', () => {
            const expected = { id: 'goblin' } as MonsterViewModel

            const actual = reducer(undefined, setMonsterViewModel(expected))

            expect(actual.viewModel).toEqual(expected)
        })

        it('stops loading and clears errors', () => {
            const expected = { id: 'goblin' } as MonsterViewModel

            const actual = reducer(
                {
                    all: [],
                    loading: true,
                    error: 'this is an error',
                    selectedMonster: {} as Monster,
                    viewModel: {} as MonsterViewModel
                } as MonstersState,
                setMonsterViewModel(expected)
            )

            expect(actual.loading).toBe(false)
            expect(actual.error).toBeUndefined()
            expect(actual.selectedMonster).not.toBeUndefined()
        })
    })

    describe('SET_SELECTED_MONSTER', () => {
        it('sets the selected monster', () => {
            const expected = { id: 'goblin' } as Monster

            const actual = reducer(undefined, setSelectedMonster(expected))

            expect(actual.selectedMonster).toEqual(expected)
        })
    })

    describe('SET_SELECTED_MONSTER_LOADING', () => {
        it('starts loading and clears errors and selected monster but not view model', () => {
            const initial = {
                all: [],
                loading: false,
                error: 'this is an error',
                viewModel: {} as MonsterViewModel,
                selectedMonster: {} as Monster
            } as MonstersState

            const actual = reducer(initial, setSelectedMonsterLoading())

            expect(actual.loading).toBe(true)
            expect(actual.error).toBeUndefined()
            expect(actual.viewModel).not.toBeUndefined()
            expect(actual.selectedMonster).toBeUndefined()
        })
    })

    describe('SET_MONSTER_ERROR', () => {
        it('sets error message and stops loading', () => {
            const expected = 'This is an error'

            const actual = reducer(
                { error: undefined, loading: true } as MonstersState,
                setMonsterError(expected)
            )

            expect(actual.error).toBe(expected)
            expect(actual.loading).toBe(false)
        })
    })

    describe('SET_SELECTED_MONSTER_CATEGORY', () => {
        it('sets the category for the selected monster', () => {
            const expected = 'brute'
            const previous = {
                selectedMonster: {
                    id: 'goblin',
                    name: 'Goblin',
                    description: 'This is a goblin',
                    category: 'sniper'
                }
            } as MonstersState

            const actual = reducer(
                previous,
                setSelectedMonsterCategory(expected)
            )

            expect(actual.selectedMonster).toEqual({
                ...previous.selectedMonster,
                category: expected
            })
        })

        it('handles the situation where there is no selected monster', () => {
            const expected = 'brute'
            const previous = {
                viewModel: undefined
            } as MonstersState

            const actual = reducer(
                previous,
                setSelectedMonsterCategory(expected)
            )

            expect(actual.viewModel).toBeUndefined()
        })
    })
})
