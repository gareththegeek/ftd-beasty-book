import State from "../State";

export const selectCategory = (state: State, categoryId: string) => state.categories.lookup[categoryId]
