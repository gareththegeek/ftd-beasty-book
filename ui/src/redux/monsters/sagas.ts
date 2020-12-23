import { call, put, select, takeEvery } from 'redux-saga/effects'
import { fetchMonster, fetchMonsters } from '../../services/monsters'
import { selectCategory } from '../categories/selectors'
import { selectHitDice } from '../hitDice/selectors'
import PayloadAction from '../PayloadAction'
import { setMonsterError, setMonsterList, setSelectedMonster, setSelectedMonsterLoading } from './actions'
import { REQUEST_MONSTER_LIST, SELECT_MONSTER } from './actionTypes'
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
            yield put(setSelectedMonster(undefined))
            return
        }

        yield put(setSelectedMonsterLoading())

        const monster: Monster = yield call(fetchMonster, monsterId)

        const hitDice = yield select(selectHitDice, monster.hitDice.toString())
        const category = yield select(selectCategory, monster.category)

        const viewModel = yield call(mapMonster, monster, hitDice, category)

        yield put(setSelectedMonster(viewModel))
    } catch (e) {
        yield put(setMonsterError(e.message))
        console.error(e)
    }
}

const sagas = [
    takeEvery(REQUEST_MONSTER_LIST, requestMonsterListSaga),
    takeEvery(SELECT_MONSTER, selectMonsterSaga)
]

export default sagas
