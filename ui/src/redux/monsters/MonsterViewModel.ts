import { CategoryType } from './CategoryType'

export default interface MonsterViewModel {
    id: string
    name: string
    category: CategoryType
    hitDice: string
    speed: number
    toHit: number
    damage: string
    armourClass: number
    hitPoints: number
    morale: number
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
    description: string
    strong: string
    weak: string
    techniques: [string?, string?, string?]
}
