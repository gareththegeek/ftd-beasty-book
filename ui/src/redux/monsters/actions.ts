import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import {
    BUILD_VIEW_MODEL,
    REQUEST_MONSTER_LIST,
    SELECT_MONSTER,
    SELECT_MONSTER_CATEGORY,
    SET_MONSTER_ERROR,
    SET_MONSTER_LIST,
    SET_MONSTER_VIEW_MODEL,
    SET_SELECTED_MONSTER,
    SET_SELECTED_MONSTER_CATEGORY,
    SET_SELECTED_MONSTER_LOADING
} from './actionTypes'
import { CategoryType } from './CategoryType'
import Monster from './Monster'
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

export const setMonsterViewModel = (
    monster?: MonsterViewModel
): PayloadAction<MonsterViewModel | undefined> => ({
    type: SET_MONSTER_VIEW_MODEL,
    payload: monster
})

export const setSelectedMonsterLoading = (): Action => ({
    type: SET_SELECTED_MONSTER_LOADING
})

export const setMonsterError = (error: string): PayloadAction<string> => ({
    type: SET_MONSTER_ERROR,
    payload: error
})

export const setSelectedMonsterCategory = (category: CategoryType) => ({
    type: SET_SELECTED_MONSTER_CATEGORY,
    payload: category
})

export const selectMonsterCategory = (category: CategoryType) => ({
    type: SELECT_MONSTER_CATEGORY,
    payload: category
})

export const setSelectedMonster = (monster: Monster | undefined) => ({
    type: SET_SELECTED_MONSTER,
    payload: monster
})

export const buildViewModel = () => ({
    type: BUILD_VIEW_MODEL
})
