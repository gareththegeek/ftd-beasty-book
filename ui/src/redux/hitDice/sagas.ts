import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchHitDice } from '../../services/hitDice'
import { setMonsterError } from '../monsters/actions'
import { setHitDice, setHitDiceLookup } from './actions'
import { REQUEST_HIT_DICE } from './actionTypes'
import HitDice from './HitDice'

export function* requestHitDiceSaga() {
    try {
        const hitDice: HitDice[] = yield call(fetchHitDice)
        yield put(setHitDice(hitDice))
        const lookup = Object.assign(
            {},
            ...hitDice.map((hitDie) => ({ [hitDie.id]: hitDie }))
        )
        yield put(setHitDiceLookup(lookup))
    } catch (e) {
        console.error(e)
        yield put(setMonsterError(e.message))
    }
}

const sagas = [takeEvery(REQUEST_HIT_DICE, requestHitDiceSaga)]

export default sagas
