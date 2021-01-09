import { AttributeType } from './AttributeType'
import { CategoryType } from './CategoryType'

export default interface Monster {
    id: string
    name: string
    category: CategoryType
    hitDice: number
    hitDiceMod: number
    numberAppearing: string
    speed: number
    altSpeed: number | undefined
    attack: AttributeType
    defence: AttributeType
    description: string
    techniques: string[]
}
