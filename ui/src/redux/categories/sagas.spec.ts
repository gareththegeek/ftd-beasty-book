import { testSaga } from 'redux-test-saga'
import { fetchCategories } from '../../services/categories'
import { setMonsterError } from '../monsters/actions'
import {
    requestCategories,
    setCategories,
    setCategoriesLookup,
    requestCategoriesComplete
} from './actions'
import Category from './Category'
import { requestCategoriesSaga } from './sagas'

const buildCategory = (): Category => ({
    id: 'id',
    name: 'name',
    str: 'strong',
    dex: 'strong',
    con: 'average',
    int: 'average',
    wis: 'weak',
    cha: 'weak',
    morale: 'strong',
    strong: 'This and that',
    weak: 'The other stuff'
})

describe('requestCategoriesSaga', () => {
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
                { ...buildCategory(), id: 'brute', name: 'Brute' },
                { ...buildCategory(), id: 'sniper', name: 'Sniper' },
                { ...buildCategory(), id: 'leader', name: 'Leader' }
            ],
            lookup: {
                brute: { ...buildCategory(), id: 'brute', name: 'Brute' },
                sniper: { ...buildCategory(), id: 'sniper', name: 'Sniper' },
                leader: { ...buildCategory(), id: 'leader', name: 'Leader' }
            }
        }

        testSaga(requestCategoriesSaga, requestCategories())
            .call(fetchCategories)
            .result(expected.all)
            .put(setCategories(expected.all))
            .put(setCategoriesLookup(expected.lookup))
            .put(requestCategoriesComplete())
            .done()
    })

    it('handles request errors', () => {
        const expected = new Error ('Something bad happened')

        testSaga(requestCategoriesSaga, requestCategories())
            .call(fetchCategories)
            .throw(expected)
            .put(setMonsterError(expected.message))
            .done()

        expect(console.error).toBeCalledWith(expected)
    })
})
