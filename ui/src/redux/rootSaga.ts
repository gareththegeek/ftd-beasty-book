import { all } from 'redux-saga/effects'
import monsters from './monsters/sagas'
import categories from './categories/sagas'
import hitDice from './hitDice/sagas'

export default function* rootSaga(): Generator {
    yield all([...monsters, ...categories, ...hitDice])
}
