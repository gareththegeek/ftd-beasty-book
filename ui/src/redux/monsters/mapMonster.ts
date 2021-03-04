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

const calculateHitPoints = (hitDice: number, hitDiceMod: number): number =>
    Math.floor(hitDice * 4.5 + hitDiceMod)

const formatHitDiceBase = (hitDice: number): string => {
    switch (hitDice) {
        case 0.25:
            return '¼'
        case 0.5:
            return '½'
        default:
            return hitDice.toString()
    }
}

const formatModifier = (modifier: number): string =>
    `${modifier < 0 ? modifier : `+${modifier}`}`

const formatHitDiceMod = (hitDiceMod: number): string =>
    hitDiceMod === 0 ? '' : ` ${formatModifier(hitDiceMod)}`

const formatHitDice = (hitDice: number, hitDiceMod: number): string =>
    `${formatHitDiceBase(hitDice)}${formatHitDiceMod(hitDiceMod)}`

const formatHitPointsFormula = (hitDice: number, hitDiceMod: number): string =>
    `${formatHitDiceBase(hitDice)}d8${formatHitDiceMod(hitDiceMod)}`

const capitalise = (text: string): string =>
    `${text.substr(0, 1).toUpperCase()}${text.substr(1)}`

export const mapMonster = (
    monster: Monster,
    hitDice: HitDice,
    category: Category
): MonsterViewModel | undefined => {
    const noMonster = !monster
    const noCategory = !category
    const noHitDice = !hitDice

    if (noMonster || noCategory || noHitDice) {
        console.warn(
            `Something's wrong: ${noMonster ? 'No Monster!' : ''}${
                noCategory ? 'No Category!' : ''
            }${noHitDice ? 'No Hit Dice!' : ''}`
        )
        return undefined
    }

    return {
        id: monster.id,
        name: monster.name,
        description: monster.description,
        category: capitalise(monster.category),
        speed: `${monster.speed}${
            !!monster.altSpeed ? ` (${monster.altSpeed})` : ''
        }`,
        hitDice: `${formatHitDice(monster.hitDice, monster.hitDiceMod)}`,
        hitPointsFormula: `${formatHitPointsFormula(
            monster.hitDice,
            monster.hitDiceMod
        )}`,
        numberAppearing: monster.numberAppearing,
        techniques: monster.techniques,
        tags: monster.tags,
        toHit: formatModifier(calculateToHit(monster, category)),
        defenceAttribute: monster.defence,
        damage: hitDice.damage,
        armourClass: calculateArmourClass(monster, category),
        hitPoints: calculateHitPoints(monster.hitDice, monster.hitDiceMod),
        morale: formatModifier(calculateMod(monster.hitDice, category.morale)),
        str: formatModifier(calculateMod(monster.hitDice, category.str)),
        dex: formatModifier(calculateMod(monster.hitDice, category.dex)),
        con: formatModifier(calculateMod(monster.hitDice, category.con)),
        int: formatModifier(calculateMod(monster.hitDice, category.int)),
        wis: formatModifier(calculateMod(monster.hitDice, category.wis)),
        cha: formatModifier(calculateMod(monster.hitDice, category.cha)),
        strong: category.strong,
        weak: category.weak
    }
}
