import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fetchMonster, fetchMonsters } from '../../services/monsters'
import { selectCategory } from '../categories/selectors'
import { selectHitDice } from '../hitDice/selectors'
import PayloadAction from '../PayloadAction'
import {
    setMonsterError,
    setMonsterList,
    setMonsterViewModel,
    setSelectedMonsterLoading
} from './actions'
import {
    REQUEST_MONSTER_LIST,
    SELECT_MONSTER,
    SELECT_MONSTER_CATEGORY
} from './actionTypes'
import { CategoryType } from './CategoryType'
import { mapMonster } from './mapMonster'
import Monster from './Monster'

export function* requestMonsterListSaga() {
    try {
        const monsters = yield call(fetchMonsters)
        yield put(setMonsterList(monsters))
    } catch (e) {
        console.error(e)
        yield put(setMonsterError(e.message))
    }
}

export function* selectMonsterSaga(action: PayloadAction<string | undefined>) {
    try {
        const monsterId = action.payload

        if (!monsterId) {
            yield put(setMonsterViewModel(undefined))
            return
        }

        yield put(setSelectedMonsterLoading())

        const monster: Monster = yield call(fetchMonster, monsterId)

        const hitDice = yield select(selectHitDice, monster.hitDice.toString())
        const category = yield select(selectCategory, monster.category)

        const viewModel = yield call(mapMonster, monster, hitDice, category)

        yield put(setMonsterViewModel(viewModel))
    } catch (e) {
        yield put(setMonsterError(e.message))
        console.error(e)
    }
}

export function* selectMonsterCategorySaga(
    action: PayloadAction<CategoryType>
) {
    // yield put(setSelectedMonsterLoading())

    // const monster: Monster = yield call(fetchMonster, monsterId)

    // const hitDice = yield select(selectHitDice, monster.hitDice.toString())
    // const category = yield select(selectCategory, monster.category)

    // const viewModel = yield call(mapMonster, monster, hitDice, category)
}

const sagas = [
    takeEvery(REQUEST_MONSTER_LIST, requestMonsterListSaga),
    takeEvery(SELECT_MONSTER, selectMonsterSaga),
    takeEvery(SELECT_MONSTER_CATEGORY, selectMonsterCategorySaga)
]

export default sagas
