import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchMonsters } from '../../services/monsters'
import { setMonsterList } from './actions'
import { REQUEST_MONSTER_LIST } from './actionTypes'

function* requestMonsterListSaga() {
    try {
        console.log('got to the saga')
        const monsters = yield call(fetchMonsters)
        yield put(setMonsterList(monsters))
    } catch (e) {
        console.error(e)
    }
}

const sagas = [takeEvery(REQUEST_MONSTER_LIST, requestMonsterListSaga)]

export default sagas
