import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createRouteReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()

export default createStore(
    createRouteReducer(history),
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
)

sagaMiddleware.run(rootSaga)
