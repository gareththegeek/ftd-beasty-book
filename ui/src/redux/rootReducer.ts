import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from 'history'

const createRouteReducer = <S>(history: History<S>) => combineReducers({
    router: connectRouter(history)
})

export default createRouteReducer
