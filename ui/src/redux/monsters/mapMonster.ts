import { AttributeStrengthType } from '../categories/AttributeStrengthType'
import Category from '../categories/Category'
import HitDice from '../hitDice/HitDice'
import { AttributeType } from './AttributeType'
import Monster from './Monster'
import MonsterViewModel from './MonsterViewModel'

const calculateMod = (
    hitDice: number,
    strength: AttributeStrengthType
): number => {
    switch (strength) {
        case 'strong':
            return Math.min(Math.floor(hitDice + 2), 12)
        case 'average':
            return Math.min(Math.floor(hitDice / 2) + 2, 10)
        case 'weak':
            return Math.min(Math.floor(hitDice / 2) - 2, 10)
        default:
            throw Error(`Unexpected attribute strength ${strength}`)
    }
}

const calculateModFromAttribute = (
    hitDice: number,
    attribute: AttributeType,
    category: Category
): number => calculateMod(hitDice, category[attribute] as AttributeStrengthType)

const calculateToHit = (monster: Monster, category: Category): number =>
    calculateModFromAttribute(monster.hitDice, monster.attack, category)

const calculateArmourClass = (monster: Monster, category: Category): number =>
    10 + calculateModFromAttribute(monster.hitDice, monster.defence, category)

const calculateHitPoints = (hitDice: number): number =>
    Math.floor(hitDice * 4.5)

export const mapMonster = (
    monster: Monster,
    hitDice: HitDice,
    category: Category
): MonsterViewModel | undefined => {
    const noMonster = !monster
    const noCategory = !category
    const noHitDice = !hitDice

    if (noMonster || noCategory || noHitDice) {
        return undefined
    }

    return {
        id: monster.id,
        name: monster.name,
        description: monster.description,
        category: monster.category,
        speed: monster.speed,
        hitDice: `${monster.hitDice}d8`,
        techniques: monster.techniques,
        toHit: calculateToHit(monster, category),
        damage: hitDice.damage,
        armourClass: calculateArmourClass(monster, category),
        hitPoints: calculateHitPoints(monster.hitDice),
        morale: calculateMod(monster.hitDice, category.morale),
        str: calculateMod(monster.hitDice, category.str),
        dex: calculateMod(monster.hitDice, category.dex),
        con: calculateMod(monster.hitDice, category.con),
        int: calculateMod(monster.hitDice, category.int),
        wis: calculateMod(monster.hitDice, category.wis),
        cha: calculateMod(monster.hitDice, category.cha),
        strong: category.strong,
        weak: category.weak
    }
}
