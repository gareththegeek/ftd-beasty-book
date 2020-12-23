import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import {
    SET_MONSTER_ERROR,
    SET_MONSTER_LIST,
    SET_SELECTED_MONSTER,
    SET_SELECTED_MONSTER_LOADING
} from './actionTypes'
import MonsterInfo from './MonsterInfo'
import MonstersState from './MonstersState'
import MonsterViewModel from './MonsterViewModel'

const initialState = () => ({
    all: [],
    selectedMonster: undefined,
    loading: false,
    error: undefined
})

const reducer = (state: MonstersState = initialState(), action: Action) => {
    switch (action.type) {
        case SET_MONSTER_LIST:
            return {
                ...state,
                all: (action as PayloadAction<MonsterInfo[]>).payload,
                loading: false,
                error: undefined,
                selectedMonster: undefined
            }
        case SET_SELECTED_MONSTER:
            return {
                ...state,
                selectedMonster: (action as PayloadAction<
                    MonsterViewModel | undefined
                >).payload,
                loading: false,
                error: undefined
            }
        case SET_SELECTED_MONSTER_LOADING:
            return {
                ...state,
                loading: true,
                error: undefined,
                selectedMonster: undefined
            }
        case SET_MONSTER_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as PayloadAction<string>).payload
            }
        default:
            return state
    }
}

export default reducer
