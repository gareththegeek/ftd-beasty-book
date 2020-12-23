import State from "../State";

export const selectMonsterList = (state: State) => state.monsters.all

export const selectSelectedMonster = (state: State) => state.monsters.viewModel

export const selectMonsterLoading = (state: State) => state.monsters.loading
