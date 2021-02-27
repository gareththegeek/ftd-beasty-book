import State from '../State'

export const selectAllHitDice = (state: State) => state.hitDice.all

export const selectHitDice = (state: State, hitDiceId: string) =>
    state.hitDice.lookup[hitDiceId.replace('.', '-')]
