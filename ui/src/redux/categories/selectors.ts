import State from "../State";

export const selectCategory = (state: State, categoryId: string) => state.categories.lookup[categoryId]

export const selectCategories = (state: State) => state.categories.all
