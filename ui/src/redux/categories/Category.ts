import { AttributeStrengthType } from './AttributeStrengthType'

export default interface Category {
    id: string
    name: string
    str: AttributeStrengthType
    dex: AttributeStrengthType
    con: AttributeStrengthType
    int: AttributeStrengthType
    wis: AttributeStrengthType
    cha: AttributeStrengthType
    morale: AttributeStrengthType
    strong: string
    weak: string
}
