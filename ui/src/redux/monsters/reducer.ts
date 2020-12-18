import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { SET_MONSTER_LIST } from './actionTypes'
import Monster from './Monster'

const initialState = () => ({
    all: []
})

const reducer = (state = initialState(), action: Action) => {
    switch(action.type) {
        case SET_MONSTER_LIST:
            return {
                ...state,
                all: (action as PayloadAction<Monster[]>).payload 
            }
        default:
            return state
    }
}

export default reducer
