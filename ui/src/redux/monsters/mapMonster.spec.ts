import { AttributeStrengthType } from '../categories/AttributeStrengthType'
import Category from '../categories/Category'
import HitDice from '../hitDice/HitDice'
import { AttributeType } from './AttributeType'
import { CategoryType } from './CategoryType'
import { mapMonster } from './mapMonster'
import Monster from './Monster'

describe('mapMonster', () => {
    const buildMonster = (): Monster => ({
        id: 'id',
        name: 'name',
        description: 'description\ndescription',
        category: 'brute',
        speed: 30,
        altSpeed: undefined,
        attack: 'str',
        defence: 'dex',
        hitDice: 1,
        hitDiceMod: 0,
        numberAppearing: 'd6',
        techniques: []
    })

    const buildHitDice = (): HitDice => ({
        id: '1',
        name: '1',
        damage: '1d6'
    })

    const buildCategory = (): Category => ({
        id: 'brute',
        name: 'Brute',
        strong: 'Strong\nstrong',
        weak: 'Weak\nweak',
        str: 'strong',
        dex: 'average',
        con: 'strong',
        int: 'weak',
        wis: 'average',
        cha: 'weak',
        morale: 'strong'
    })

    it('maps the id, name, description and techniques of the monster to view model unchanged', () => {
        const expected = {
            ...buildMonster(),
            id: 'goblin',
            name: 'Goblin',
            description:
                'Goblins are a small incredibly ugly human-like race.\nTheir skin is a pale earthy color, such as chalky tan or livid gray.',
            techniques: ['technique 1', 'technique 2']
        }

        const actual = mapMonster(
            { ...expected },
            buildHitDice(),
            buildCategory()
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.id).toEqual(expected.id)
        expect(actual!.name).toEqual(expected.name)
        expect(actual!.description).toEqual(expected.description)
        expect(actual!.techniques).toEqual(expected.techniques)
    })

    it('maps speed to view model as is', () => {
        const expected = {
            ...buildMonster(),
            speed: 50
        }

        const actual = mapMonster(
            { ...expected },
            buildHitDice(),
            buildCategory()
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.speed).toEqual('50')
    })

    it('includes alternative speed in brackets if defined', () => {
        const expected = {
            ...buildMonster(),
            speed: 30,
            altSpeed: 60
        }

        const actual = mapMonster(
            { ...expected },
            buildHitDice(),
            buildCategory()
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.speed).toEqual('30 (60)')
    })

    it('maps number appearing to view model as is', () => {
        const expected = {
            ...buildMonster(),
            numberAppearing: '5d100'
        }

        const actual = mapMonster(
            { ...expected },
            buildHitDice(),
            buildCategory()
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.numberAppearing).toEqual(expected.numberAppearing)
    })

    it('formats category to pascal case', () => {
        const expected = 'Sniper'
        const monster = {
            ...buildMonster(),
            category: 'sniper' as CategoryType
        }

        const actual = mapMonster(
            { ...monster },
            buildHitDice(),
            buildCategory()
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.category).toEqual(expected)
    })
    ;[
        { hitDice: 0.25, hitDiceMod: 0, expected: '¼' },
        { hitDice: 0.5, hitDiceMod: 0, expected: '½' },
        { hitDice: 1, hitDiceMod: 0, expected: '1' },
        { hitDice: 10, hitDiceMod: 0, expected: '10' },
        { hitDice: 0.5, hitDiceMod: 1, expected: '½ +1' },
        { hitDice: 1, hitDiceMod: 2, expected: '1 +2' },
        { hitDice: 0.5, hitDiceMod: -1, expected: '½ -1' },
        { hitDice: 1, hitDiceMod: -2, expected: '1 -2' },
    ].forEach((example) =>
        it(`correctly formats hit dice ${example.hitDice} with hit dice mod ${example.hitDiceMod} as ${example.expected}`, () => {
            const monster = {
                ...buildMonster(),
                hitDice: example.hitDice,
                hitDiceMod: example.hitDiceMod
            }

            const actual = mapMonster(
                { ...monster },
                buildHitDice(),
                buildCategory()
            )

            expect(actual).not.toBeUndefined()
            expect(actual!.hitDice).toEqual(example.expected)
        })
    )

    ;[
        { hitDice: 0.25, hitDiceMod: 0, expected: '¼d8' },
        { hitDice: 0.5, hitDiceMod: 0, expected: '½d8' },
        { hitDice: 1, hitDiceMod: 0, expected: '1d8' },
        { hitDice: 10, hitDiceMod: 0, expected: '10d8' },
        { hitDice: 0.5, hitDiceMod: -1, expected: '½d8-1' },
        { hitDice: 2, hitDiceMod: 1, expected: '2d8+1' },
        { hitDice: 1, hitDiceMod: 3, expected: '1d8+3' },
    ].forEach((example) =>
        it(`correctly formats hit points formula for ${example.hitDice}hd and hd mod of ${example.hitDiceMod} as ${example.expected}`, () => {
            const monster = {
                ...buildMonster(),
                hitDice: example.hitDice,
                hitDiceMod: example.hitDiceMod
            }

            const actual = mapMonster(
                { ...monster },
                buildHitDice(),
                buildCategory()
            )

            expect(actual).not.toBeUndefined()
            expect(actual!.hitPointsFormula).toEqual(example.expected)
        })
    )

    interface ToHitExample {
        ability: AttributeType
        strength: AttributeStrengthType
        hitDice: number
        expected: number
    }

    ;([
        { ability: 'str', strength: 'strong', hitDice: 0.5, expected: 2 },
        { ability: 'str', strength: 'average', hitDice: 0.5, expected: 2 },
        { ability: 'str', strength: 'weak', hitDice: 0.5, expected: -2 },
        { ability: 'dex', strength: 'strong', hitDice: 3, expected: 5 },
        { ability: 'dex', strength: 'average', hitDice: 3, expected: 3 },
        { ability: 'dex', strength: 'weak', hitDice: 3, expected: -1 },
        { ability: 'str', strength: 'strong', hitDice: 10, expected: 12 },
        { ability: 'str', strength: 'strong', hitDice: 11, expected: 12 },
        { ability: 'str', strength: 'average', hitDice: 16, expected: 10 },
        { ability: 'str', strength: 'average', hitDice: 17, expected: 10 },
        { ability: 'str', strength: 'weak', hitDice: 20, expected: 8 },
        { ability: 'str', strength: 'weak', hitDice: 21, expected: 8 }
    ] as ToHitExample[]).forEach((example) =>
        it(`calculates to hit of ${example.expected} based upon ${example.strength} ${example.ability} attack ability for ${example.hitDice}HD monster`, () => {
            const monster = {
                ...buildMonster(),
                attack: example.ability,
                hitDice: example.hitDice
            }
            const category = {
                ...buildCategory()
            }
            category[example.ability] = example.strength

            const actual = mapMonster(monster, buildHitDice(), category)

            expect(actual).not.toBeUndefined()
            expect(actual?.toHit).toEqual(example.expected)
        })
    )

    it('correctly maps damage based upon hit dice', () => {
        const expected = {
            ...buildHitDice(),
            damage: '2d6+1'
        }

        const actual = mapMonster(
            buildMonster(),
            { ...expected },
            buildCategory()
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.damage).toEqual(expected.damage)
    })

    ;([
        { ability: 'str', strength: 'strong', hitDice: 0.5, expected: 12 },
        { ability: 'str', strength: 'average', hitDice: 0.5, expected: 12 },
        { ability: 'str', strength: 'weak', hitDice: 0.5, expected: 8 },
        { ability: 'dex', strength: 'strong', hitDice: 3, expected: 15 },
        { ability: 'dex', strength: 'average', hitDice: 3, expected: 13 },
        { ability: 'dex', strength: 'weak', hitDice: 3, expected: 9 },
        { ability: 'str', strength: 'strong', hitDice: 10, expected: 22 },
        { ability: 'str', strength: 'strong', hitDice: 11, expected: 22 },
        { ability: 'str', strength: 'average', hitDice: 16, expected: 20 },
        { ability: 'str', strength: 'average', hitDice: 17, expected: 20 },
        { ability: 'str', strength: 'weak', hitDice: 20, expected: 18 },
        { ability: 'str', strength: 'weak', hitDice: 21, expected: 18 }
    ] as ToHitExample[]).forEach((example) =>
        it(`calculates armour class of ${example.expected} based upon ${example.strength} ${example.ability} defence ability of ${example.hitDice}HD monster`, () => {
            const monster = {
                ...buildMonster(),
                defence: example.ability,
                hitDice: example.hitDice
            }
            const category = {
                ...buildCategory()
            }
            category[example.ability] = example.strength

            const actual = mapMonster(monster, buildHitDice(), category)

            expect(actual).not.toBeUndefined()
            expect(actual?.armourClass).toEqual(example.expected)
        })
    )
    ;[
        { hitDice: 0.25, hitDiceMod: 0, expected: 1 },
        { hitDice: 0.5, hitDiceMod: 0, expected: 2 },
        { hitDice: 1, hitDiceMod: 0, expected: 4 },
        { hitDice: 2, hitDiceMod: 0, expected: 9 },
        { hitDice: 6, hitDiceMod: 0, expected: 27 },
        { hitDice: 9, hitDiceMod: 0, expected: 40 },
        { hitDice: 13, hitDiceMod: 0, expected: 58 },
        { hitDice: 17, hitDiceMod: 0, expected: 76 },
        { hitDice: 18, hitDiceMod: 0, expected: 81 },
        { hitDice: 1, hitDiceMod: -1, expected: 3 },
        { hitDice: 1, hitDiceMod: +1, expected: 5 },
        { hitDice: 0.25, hitDiceMod: +1, expected: 2 },
        { hitDice: 7, hitDiceMod: +3, expected: 34 },
    ].forEach((example) =>
        it(`calculates hit points of ${example.expected} based upon hit dice of ${example.hitDice} and hit dice mod of ${example.hitDiceMod}`, () => {
            const monster = {
                ...buildMonster(),
                hitDice: example.hitDice,
                hitDiceMod: example.hitDiceMod
            }

            const actual = mapMonster(monster, buildHitDice(), buildCategory())

            expect(actual).not.toBeUndefined()
            expect(actual?.hitPoints).toEqual(example.expected)
        })
    )

    ;([
        { ability: 'str', strength: 'strong', hitDice: 0.5, expected: 2 },
        { ability: 'str', strength: 'average', hitDice: 0.5, expected: 2 },
        { ability: 'str', strength: 'weak', hitDice: 0.5, expected: -2 },
        { ability: 'dex', strength: 'strong', hitDice: 3, expected: 5 },
        { ability: 'dex', strength: 'average', hitDice: 3, expected: 3 },
        { ability: 'dex', strength: 'weak', hitDice: 3, expected: -1 },
        { ability: 'str', strength: 'strong', hitDice: 10, expected: 12 },
        { ability: 'str', strength: 'strong', hitDice: 11, expected: 12 },
        { ability: 'str', strength: 'average', hitDice: 16, expected: 10 },
        { ability: 'str', strength: 'average', hitDice: 17, expected: 10 },
        { ability: 'str', strength: 'weak', hitDice: 20, expected: 8 },
        { ability: 'str', strength: 'weak', hitDice: 21, expected: 8 },
        { ability: 'con', strength: 'strong', hitDice: 5, expected: 7 },
        { ability: 'con', strength: 'average', hitDice: 5, expected: 4 },
        { ability: 'con', strength: 'weak', hitDice: 5, expected: 0 },
        { ability: 'int', strength: 'strong', hitDice: 11, expected: 12 },
        { ability: 'int', strength: 'average', hitDice: 11, expected: 7 },
        { ability: 'int', strength: 'weak', hitDice: 11, expected: 3 },
        { ability: 'wis', strength: 'strong', hitDice: 12, expected: 12 },
        { ability: 'wis', strength: 'average', hitDice: 12, expected: 8 },
        { ability: 'wis', strength: 'weak', hitDice: 12, expected: 4 },
        { ability: 'cha', strength: 'strong', hitDice: 15, expected: 12 },
        { ability: 'cha', strength: 'average', hitDice: 15, expected: 9 },
        { ability: 'cha', strength: 'weak', hitDice: 15, expected: 5 },
    ] as ToHitExample[]).forEach((example) =>
        it(`calculates ${example.ability} mod of ${example.expected} based upon ${example.strength} ability for ${example.hitDice}HD monster`, () => {
            const monster = {
                ...buildMonster(),
                hitDice: example.hitDice
            }
            const category = {
                ...buildCategory()
            }
            category[example.ability] = example.strength

            const actual = mapMonster(monster, buildHitDice(), category)

            expect(actual).not.toBeUndefined()
            expect(actual?.[example.ability]).toEqual(example.expected)
        })
    )

    it('correctly maps strengths and weaknesses based upon category', () => {
        const expected = {
            ...buildCategory(),
            strong: 'things the monster is good at\na\nb',
            weak: 'Things the monster is bad at\nc\nd'
        }

        const actual = mapMonster(
            buildMonster(),
            buildHitDice(),
            { ...expected }
        )

        expect(actual).not.toBeUndefined()
        expect(actual!.strong).toEqual(expected.strong)
        expect(actual!.weak).toEqual(expected.weak)
    })
})
