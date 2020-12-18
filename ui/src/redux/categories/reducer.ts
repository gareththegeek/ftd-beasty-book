import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { SET_CATEGORIES, SET_CATEGORIES_LOOKUP } from './actionTypes'
import { CategoriesLookup } from './CategoriesLookup'
import CategoriesState from './CategoriesState'
import Category from './Category'

const initialState = () => ({
    all: [],
    lookup: {}
})

const reducer = (state: CategoriesState = initialState(), action: Action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                all: (action as PayloadAction<Category[]>).payload
            }
        case SET_CATEGORIES_LOOKUP:
            return {
                ...state,
                lookup: (action as PayloadAction<CategoriesLookup>).payload
            }
        default:
            return state
    }
}

export default reducer
