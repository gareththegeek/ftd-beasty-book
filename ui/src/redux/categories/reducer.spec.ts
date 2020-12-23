import { setCategories, setCategoriesLookup } from './actions'
import Category from './Category'
import reducer from './reducer'

describe('categories reducer', () => {
    it('returns initial state by default', () => {
        const actual = reducer(undefined, { type: 'default' })

        expect(actual.all).toEqual([])
        expect(actual.lookup).toEqual({})
    })

    describe('SET_CATEGORIES', () => {
        it('updates categories.all', () => {
            const expected = [
                { id: 'one' },
                { id: 'two' },
                { id: 'three' }
            ] as Category[]

            const actual = reducer(undefined, setCategories(expected))

            expect(actual.all).toEqual(expected)
        })

        it('does not mutate state', () => {
            const expected = {
                all: [
                    { id: 'one' },
                    { id: 'two' },
                    { id: 'three' }
                ] as Category[],
                lookup: {}
            }

            const actual = reducer(expected, setCategories([...expected.all]))

            expect(actual.all).not.toBe(expected.all)
            expect(actual.lookup).toEqual(expected.lookup)
        })
    })

    describe('SET_CATEGORIES_LOOKUP', () => {
        it('handles categories.lookup', () => {
            const expected = {
                one: { id: 'one' } as Category,
                two: { id: 'two' } as Category,
                three: { id: 'three' } as Category
            }

            const actual = reducer(undefined, setCategoriesLookup(expected))

            expect(actual.lookup).toEqual(expected)
        })

        it('does not mutate state', () => {
            const expected = {
                all: [
                    { id: 'one' },
                    { id: 'two' },
                    { id: 'three' }
                ] as Category[],
                lookup: {}
            }

            const actual = reducer(
                expected,
                setCategoriesLookup({ ...expected.lookup })
            )

            expect(actual.lookup).not.toBe(expected.lookup)
            expect(actual.all).toEqual(expected.all)
        })
    })
})
