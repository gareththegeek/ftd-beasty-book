import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { SET_MONSTER_LIST, SET_SELECTED_MONSTER } from './actionTypes'
import MonsterInfo from './MonsterInfo'
import MonstersState from './MonstersState'
import MonsterViewModel from './MonsterViewModel'

const initialState = () => ({
    all: [],
    selectedMonster: undefined
})

const reducer = (state: MonstersState = initialState(), action: Action) => {
    switch(action.type) {
        case SET_MONSTER_LIST:
            return {
                ...state,
                all: (action as PayloadAction<MonsterInfo[]>).payload 
            }
        case SET_SELECTED_MONSTER:
            return {
                ...state,
                selectedMonster: (action as PayloadAction<MonsterViewModel | undefined>).payload 
            }
        default:
            return state
    }
}

export default reducer
