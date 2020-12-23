import { testSaga } from 'redux-test-saga'
import { fetchHitDice } from '../../services/hitDice'
import { setMonsterError } from '../monsters/actions'
import { requestHitDice, setHitDice, setHitDiceLookup } from './actions'
import HitDice from './HitDice'
import { requestHitDiceSaga } from './sagas'

const buildHitDice = (): HitDice => ({
    id: '0-5',
    name: '0.5',
    damage: '2d6'
})

describe('requestHitDiceSaga', () => {
    let original = console.error

    beforeEach(() => {
        console.error = jest.fn()
    })

    afterEach(() => {
        console.error = original
    })

    it('handles happy path', () => {
        const expected = {
            all: [
                { ...buildHitDice(), id: '0-5', name: '0.5' },
                { ...buildHitDice(), id: '2', name: '2' },
                { ...buildHitDice(), id: '1', name: '1' }
            ],
            lookup: {
                '0-5': { ...buildHitDice(), id: '0-5', name: '0.5' },
                '1': { ...buildHitDice(), id: '1', name: '1' },
                '2': { ...buildHitDice(), id: '2', name: '2' }
            }
        }

        testSaga(requestHitDiceSaga, requestHitDice())
            .call(fetchHitDice)
            .result(expected.all)
            .put(setHitDice(expected.all))
            .put(setHitDiceLookup(expected.lookup))
            .done()
    })

    it('handles request errors', () => {
        const expected = new Error('Something bad happened')

        testSaga(requestHitDiceSaga, requestHitDice())
            .call(fetchHitDice)
            .throw(expected)
            .put(setMonsterError(expected.message))
            .done()

        expect(console.error).toBeCalledWith(expected)
    })
})
