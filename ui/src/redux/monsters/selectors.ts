import State from "../State";

export const selectMonsterList = (state: State) => state.monsters.all

export const selectMonsterViewModel = (state: State) => state.monsters.viewModel

export const selectSelectedMonster = (state: State) => state.monsters.selectedMonster

export const selectMonsterLoading = (state: State) => state.monsters.loading
