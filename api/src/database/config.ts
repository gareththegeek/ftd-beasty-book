import { ConnectionConfig } from "ftd-enchiridion-mongo-repo"

export enum Collections {
    monsters,
    hitdice,
    categories
}

const COLLECTION_LOOKUP = {
    [Collections.monsters]: process.env.MONSTERS_COLLECTION ?? 'monsters',
    [Collections.hitdice]: process.env.HITDICE_COLLECTION ?? 'hitdice',
    [Collections.categories]: process.env.CATEGORIES_COLLECTION ?? 'categories'
}

export const getDatabaseConfig = (collection: Collections): ConnectionConfig => ({
    mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost',
    databaseName: process.env.DATABASE_NAME ?? 'ftd-enchiridion',
    collectionName: COLLECTION_LOOKUP[collection]
})
