import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import {
    SET_MONSTER_ERROR,
    SET_MONSTER_LIST,
    SET_MONSTER_VIEW_MODEL,
    SET_SELECTED_MONSTER,
    SET_SELECTED_MONSTER_CATEGORY,
    SET_SELECTED_MONSTER_LOADING
} from './actionTypes'
import MonsterInfo from './MonsterInfo'
import MonstersState from './MonstersState'
import MonsterViewModel from './MonsterViewModel'

const initialState = () => ({
    all: [],
    selectedMonster: undefined,
    viewModel: undefined,
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
                viewModel: undefined,
                selectedMonster: undefined
            }
        case SET_SELECTED_MONSTER:
            return {
                ...state,
                selectedMonster: (action as PayloadAction<MonsterInfo[]>).payload
            }
        case SET_MONSTER_VIEW_MODEL:
            return {
                ...state,
                viewModel: (action as PayloadAction<
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
                viewModel: undefined,
                selectedMonster: undefined
            }
        case SET_MONSTER_ERROR:
            return {
                ...state,
                loading: false,
                error: (action as PayloadAction<string>).payload
            }
        case SET_SELECTED_MONSTER_CATEGORY:
            return {
                ...state,
                selectedMonster: !!state.selectedMonster
                    ? {
                          ...state.selectedMonster,
                          category: (action as PayloadAction<string>).payload
                      }
                    : undefined
            }
        default:
            return state
    }
}

export default reducer
