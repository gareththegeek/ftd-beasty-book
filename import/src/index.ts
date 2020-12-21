require('dotenv').config()
import { createReadStream } from 'fs'
import csv from 'csv-parser'
import { Repository } from 'ftd-beasty-book-mongo-repo'
;(async () => {
    const mongoUrl = process.env.MONGO_URL ?? 'mongodb://localhost'
    const databaseName = process.env.DATABASE_NAME ?? 'ftd-beasty-book'

    const monsterRepo = new Repository({
        mongoUrl,
        databaseName,
        collectionName: process.env.MONSTER_COLLECTION_NAME ?? 'monsters'
    })

    const hitDiceRepo = new Repository({
        mongoUrl,
        databaseName,
        collectionName: process.env.HITDICE_COLLECTION_NAME ?? 'hitdice'
    })

    const categoriesRepo = new Repository({
        mongoUrl,
        databaseName,
        collectionName: process.env.CATEGORIES_COLLECTION_NAME ?? 'categories'
    })

    const getId = (name: string): string =>
        name
            .toLowerCase()
            .replace(/[\s\.]/g, '-')
            .replace(/[^a-zA-Z0-9\-]/g, '')

    createReadStream('data/monsters.csv')
        .pipe(csv())
        .on('data', (row) => {
            const techniques = [row.T1, row.T2, row.T3].filter((x) => x !== '')
            const monster = {
                id: getId(row.Name),
                name: row.Name,
                category: (row.Category as string).toLowerCase(),
                hitDice: parseFloat(row.HD),
                speed: parseInt(row.Spd),
                attack: (row.Atk as string).toLowerCase(),
                defence: (row.Def as string).toLowerCase(),
                description: row.Description,
                techniques
            }
            monsterRepo.upsert(monster)
        })
        .on('end', () => {
            console.log('Imported monsters')
        })

    createReadStream('data/hitdice.csv')
        .pipe(csv())
        .on('data', (row) => {
            const hitdice = {
                id: getId(row.HD),
                hitDice: parseFloat(row.HD),
                damage: row['Avg. Damage']
            }
            hitDiceRepo.upsert(hitdice)
        })
        .on('end', () => {
            console.log('Imported hit dice damage')
        })

    type StrengthWeaknessModifier = '-1' | '0' | '1'
    const StrengthWeaknessLookup = {
        '-1': 'weak',
        '0': 'average',
        '1': 'strong'
    }

    createReadStream('data/categories.csv')
        .pipe(csv())
        .on('data', (row) => {
            const categories = {
                id: getId(row.Category),
                category: row.Category,
                str:
                    StrengthWeaknessLookup[row.STR as StrengthWeaknessModifier],
                dex:
                    StrengthWeaknessLookup[row.DEX as StrengthWeaknessModifier],
                con:
                    StrengthWeaknessLookup[row.CON as StrengthWeaknessModifier],
                int:
                    StrengthWeaknessLookup[row.INT as StrengthWeaknessModifier],
                wis:
                    StrengthWeaknessLookup[row.WIS as StrengthWeaknessModifier],
                cha:
                    StrengthWeaknessLookup[row.CHA as StrengthWeaknessModifier],
                morale:
                    StrengthWeaknessLookup[
                        row.Morale as StrengthWeaknessModifier
                    ],
                strong: row.Strong,
                weak: row.Weak
            }
            categoriesRepo.upsert(categories)
        })
        .on('end', () => {
            console.log('Imported categories')
        })
})()
