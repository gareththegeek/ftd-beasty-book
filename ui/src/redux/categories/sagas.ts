import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCategories } from '../../services/categories'
import { setCategories, setCategoriesLookup } from './actions'
import { REQUEST_CATEGORIES } from './actionTypes'
import Category from './Category'

function* requestCategoriesSaga() {
    try {
        const categories: Category[] = yield call(fetchCategories)
        yield put(setCategories(categories))
        const lookup = Object.assign(
            {},
            ...categories.map((category) => ({ [category.id]: category }))
        )
        yield put(setCategoriesLookup(lookup))
    } catch (e) {
        console.error(e)
    }
}

const sagas = [takeEvery(REQUEST_CATEGORIES, requestCategoriesSaga)]

export default sagas
