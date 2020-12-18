import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { REQUEST_MONSTER_LIST, SET_MONSTER_LIST } from './actionTypes'
import Monster from './Monster'

export const requestMonsterList = (): Action => ({
    type: REQUEST_MONSTER_LIST
})

export const setMonsterList = (monsters: Monster[]): PayloadAction<Monster[]> => ({
    type: SET_MONSTER_LIST,
    payload: monsters
})
