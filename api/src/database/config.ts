import { ConnectionConfig } from "ftd-beasty-book-mongo-repo"

export enum Collections {
    monsters,
    hitdice,
    categories
}

export const COLLECTION_LOOKUP = {
    [Collections.monsters]: process.env.MONSTERS_COLLECTION ?? 'monsters',
    [Collections.hitdice]: process.env.HITDICE_COLLECTION ?? 'hitdice',
    [Collections.categories]: process.env.CATEGORIES_COLLECTION ?? 'categories'
}

export const getDatabaseConfig = (collection: Collections): ConnectionConfig => ({
    mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost',
    databaseName: process.env.DATABASE_NAME ?? 'ftd-beasty-book',
    collectionName: COLLECTION_LOOKUP[collection]
})
