import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { REQUEST_HIT_DICE, SET_HIT_DICE, SET_HIT_DICE_LOOKUP } from './actionTypes'
import HitDice from './HitDice'
import { HitDiceLookup } from './HitDiceLookup'

export const requestHitDice = (): Action => ({
    type: REQUEST_HIT_DICE
})

export const setHitDice = (hitDice: HitDice[]): PayloadAction<HitDice[]> => ({
    type: SET_HIT_DICE,
    payload: hitDice
})

export const setHitDiceLookup = (lookup: HitDiceLookup): PayloadAction<HitDiceLookup> => ({
    type: SET_HIT_DICE_LOOKUP,
    payload: lookup
})
