import HitDice from './HitDice'

export default interface HitDiceState {
    all: HitDice[],
    lookup: { [id: string]: HitDice }
}
