import State from "../State";

export const selectMonsterList = (state: State) => state.monsters.all

export const selectSelectedMonster = (state: State) => state.monsters.selectedMonster
