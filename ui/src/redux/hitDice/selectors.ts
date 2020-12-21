import State from '../State'

export const selectHitDice = (state: State, hitDiceId: string) =>
    state.hitDice.lookup[hitDiceId.replace('.', '-')]
