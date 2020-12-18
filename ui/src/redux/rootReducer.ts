import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history'
import monsterReducer from './monsters/reducer'

const createRouteReducer = <S>(history: History<S>) => combineReducers({
    router: connectRouter(history),
    monsters: monsterReducer
})

export default createRouteReducer
