import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { SET_HIT_DICE, SET_HIT_DICE_LOOKUP } from './actionTypes'
import HitDiceState from './HitDiceState'
import HitDice from './HitDice'
import { HitDiceLookup } from './HitDiceLookup'

const initialState = () => ({
    all: [],
    lookup: {}
})

const reducer = (state: HitDiceState = initialState(), action: Action) => {
    switch (action.type) {
        case SET_HIT_DICE:
            return {
                ...state,
                all: (action as PayloadAction<HitDice[]>).payload
            }
            case SET_HIT_DICE_LOOKUP:
            return {
                ...state,
                lookup: (action as PayloadAction<HitDiceLookup>).payload
            }
        default:
            return state
    }
}

export default reducer
