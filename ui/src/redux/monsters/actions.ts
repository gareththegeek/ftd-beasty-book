import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import {
    REQUEST_MONSTER_LIST,
    SELECT_MONSTER,
    SET_MONSTER_ERROR,
    SET_MONSTER_LIST,
    SET_SELECTED_MONSTER,
    SET_SELECTED_MONSTER_LOADING
} from './actionTypes'
import MonsterInfo from './MonsterInfo'
import MonsterViewModel from './MonsterViewModel'

export const requestMonsterList = (): Action => ({
    type: REQUEST_MONSTER_LIST
})

export const setMonsterList = (
    monsters: MonsterInfo[]
): PayloadAction<MonsterInfo[]> => ({
    type: SET_MONSTER_LIST,
    payload: monsters
})

export const selectMonster = (
    monsterId?: string
): PayloadAction<string | undefined> => ({
    type: SELECT_MONSTER,
    payload: monsterId
})

export const setSelectedMonster = (
    monster?: MonsterViewModel
): PayloadAction<MonsterViewModel | undefined> => ({
    type: SET_SELECTED_MONSTER,
    payload: monster
})

export const setSelectedMonsterLoading = (): Action => ({
    type: SET_SELECTED_MONSTER_LOADING
})

export const setMonsterError = (error: string): PayloadAction<string> => ({
    type: SET_MONSTER_ERROR,
    payload: error
})
