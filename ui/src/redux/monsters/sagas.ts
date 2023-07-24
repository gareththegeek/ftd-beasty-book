import { call, put, select, take, takeEvery } from 'redux-saga/effects'
import { fetchMonster, fetchMonsters } from '../../services/monsters'
import { requestCategories } from '../categories/actions'
import { REQUEST_CATEGORIES_COMPLETE } from '../categories/actionTypes'
import { selectCategories, selectCategory } from '../categories/selectors'
import { requestHitDice } from '../hitDice/actions'
import { REQUEST_HIT_DICE_COMPLETE } from '../hitDice/actionTypes'
import { selectAllHitDice, selectHitDice } from '../hitDice/selectors'
import PayloadAction from '../PayloadAction'
import {
    buildViewModel,
    setMonsterError,
    setMonsterList,
    setMonsterViewModel,
    setSelectedMonster,
    setSelectedMonsterCategory,
    setSelectedMonsterLoading
} from './actions'
import {
    BUILD_VIEW_MODEL,
    REQUEST_MONSTER_LIST,
    SELECT_MONSTER,
    SELECT_MONSTER_CATEGORY,
    SET_MONSTER_ERROR
} from './actionTypes'
import { CategoryType } from './CategoryType'
import { mapMonster } from './mapMonster'
import Monster from './Monster'
import { selectSelectedMonster } from './selectors'

export function* requestMonsterListSaga(): any {
    try {
        const monsters = yield call(fetchMonsters)
        yield put(setMonsterList(monsters))
    } catch (e: any) {
        console.error(e)
        yield put(setMonsterError(e.message))
    }
}

export function* buildViewModelSaga(): any {
    try {
        const monster = yield select(selectSelectedMonster)

        if (!monster) {
            yield put(setMonsterViewModel(undefined))
            return
        }

        const hitDice = yield select(selectHitDice, monster.hitDice.toString())
        const category = yield select(selectCategory, monster.category)

        const viewModel = yield call(mapMonster, monster, hitDice, category)

        yield put(setMonsterViewModel(viewModel))
    } catch (e: any) {
        yield put(setMonsterError(e.message))
    }
}

export function* selectMonsterSaga(
    action: PayloadAction<string | undefined>
): any {
    try {
        const monsterId = action.payload

        const categories = yield select(selectCategories)
        const hitDice = yield select(selectAllHitDice)

        if (categories.length === 0) {
            yield put(requestCategories())
            yield take([REQUEST_CATEGORIES_COMPLETE, SET_MONSTER_ERROR])
        }
        if (hitDice.length === 0) {
            yield put(requestHitDice())
            yield take([REQUEST_HIT_DICE_COMPLETE, SET_MONSTER_ERROR])
        }

        if (!monsterId) {
            yield put(setMonsterViewModel(undefined))
            return
        }

        yield put(setSelectedMonsterLoading())

        const monster: Monster = yield call(fetchMonster, monsterId)

        yield put(setSelectedMonster(monster))

        yield put(buildViewModel())
    } catch (e: any) {
        yield put(setMonsterError(e.message))
        console.error(e)
    }
}

export function* selectMonsterCategorySaga(
    action: PayloadAction<CategoryType>
): any {
    try {
        yield put(setSelectedMonsterCategory(action.payload))
        yield put(buildViewModel())
    } catch (e: any) {
        yield put(setMonsterError(e.message))
    }
}

const sagas = [
    takeEvery(REQUEST_MONSTER_LIST, requestMonsterListSaga),
    takeEvery(SELECT_MONSTER, selectMonsterSaga),
    takeEvery(SELECT_MONSTER_CATEGORY, selectMonsterCategorySaga),
    takeEvery(BUILD_VIEW_MODEL, buildViewModelSaga)
]

export default sagas
