import { setHitDice, setHitDiceLookup } from './actions'
import HitDice from './HitDice'
import reducer from './reducer'

describe('hit dice reducer', () => {
    it('returns initial state by default', () => {
        const actual = reducer(undefined, { type: 'default' })

        expect(actual.all).toEqual([])
        expect(actual.lookup).toEqual({})
    })

    describe('SET_HIT_DICE', () => {
        it('updates hitDice.all', () => {
            const expected = [
                { id: 'one' },
                { id: 'two' },
                { id: 'three' }
            ] as HitDice[]

            const actual = reducer(undefined, setHitDice(expected))

            expect(actual.all).toEqual(expected)
        })

        it('does not mutate state', () => {
            const expected = {
                all: [
                    { id: 'one' },
                    { id: 'two' },
                    { id: 'three' }
                ] as HitDice[],
                lookup: {}
            }

            const actual = reducer(expected, setHitDice([...expected.all]))

            expect(actual.all).not.toBe(expected.all)
            expect(actual.lookup).toEqual(expected.lookup)
        })
    })

    describe('SET_HIT_DICE_LOOKUP', () => {
        it('updates hitDice.lookup', () => {
            const expected = {
                one: { id: 'one' } as HitDice,
                two: { id: 'two' } as HitDice,
                three: { id: 'three' } as HitDice
            }

            const actual = reducer(undefined, setHitDiceLookup(expected))

            expect(actual.lookup).toEqual(expected)
        })

        it('does not mutate state', () => {
            const expected = {
                all: [
                    { id: 'one' },
                    { id: 'two' },
                    { id: 'three' }
                ] as HitDice[],
                lookup: {}
            }

            const actual = reducer(
                expected,
                setHitDiceLookup({ ...expected.lookup })
            )

            expect(actual.lookup).not.toBe(expected.lookup)
            expect(actual.all).toEqual(expected.all)
        })
    })
})
