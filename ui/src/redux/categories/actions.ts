import { Action } from 'redux'
import PayloadAction from '../PayloadAction'
import { REQUEST_CATEGORIES, SET_CATEGORIES, SET_CATEGORIES_LOOKUP } from './actionTypes'
import { CategoriesLookup } from './CategoriesLookup'
import Category from './Category'

export const requestCategories = (): Action => ({
    type: REQUEST_CATEGORIES
})

export const setCategories = (categories: Category[]): PayloadAction<Category[]> => ({
    type: SET_CATEGORIES,
    payload: categories
})

export const setCategoriesLookup = (lookup: CategoriesLookup): PayloadAction<CategoriesLookup> => ({
    type: SET_CATEGORIES_LOOKUP,
    payload: lookup
})
