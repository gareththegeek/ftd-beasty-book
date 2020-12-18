require('dotenv').config()
import { Repository } from 'ftd-enchiridion-mongo-repo'

const x = new Repository({
    mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost',
    databaseName: process.env.DATABASE_NAME ?? 'ftd-enchiridion',
    collectionName: process.env.MONSTER_COLLECTION_NAME ?? 'monsters'
})

//x.getAll().then((x) => { console.log(x)})
x.upsert({ id: '1', data: 'test' }).then((x) => { console.log(x)})
