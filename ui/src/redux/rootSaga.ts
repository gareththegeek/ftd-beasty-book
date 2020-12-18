import { all } from 'redux-saga/effects'
import monsters from './monsters/sagas'

export default function* rootSaga(): Generator {
    yield all([...monsters])
}
