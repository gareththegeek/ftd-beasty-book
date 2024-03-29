import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCategories } from '../../services/categories'
import { setMonsterError } from '../monsters/actions'
import {
    requestCategoriesComplete,
    setCategories,
    setCategoriesLookup
} from './actions'
import { REQUEST_CATEGORIES } from './actionTypes'
import Category from './Category'

export function* requestCategoriesSaga(): any {
    try {
        const categories: Category[] = yield call(fetchCategories)

        yield put(setCategories(categories))
        const lookup = Object.assign(
            {},
            ...categories.map((category) => ({ [category.id]: category }))
        )
        yield put(setCategoriesLookup(lookup))
        yield put(requestCategoriesComplete())
    } catch (e: any) {
        console.error(e)
        yield put(setMonsterError(e.message))
    }
}

const sagas = [takeEvery(REQUEST_CATEGORIES, requestCategoriesSaga)]

export default sagas
