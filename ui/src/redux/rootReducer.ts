import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history'
import monsterReducer from './monsters/reducer'
import categoriesReducer from './categories/reducer'
import hitDiceReducer from './hitDice/reducer'

const createRouteReducer = <S>(history: History<S>) => combineReducers({
    router: connectRouter(history),
    monsters: monsterReducer,
    categories: categoriesReducer,
    hitDice: hitDiceReducer
})

export default createRouteReducer
