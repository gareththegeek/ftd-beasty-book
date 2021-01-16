import { Id, IRepository } from 'ftd-beasty-book-mongo-repo'
import { FilterQuery } from 'mongodb'
import { Collections, COLLECTION_LOOKUP } from './config'
import fs from 'fs'
import path from 'path'

const DATA_DIRECTORY = '../../data'

export class Fauxpository implements IRepository {
    private data: Id[]

    constructor(collection: Collections) {
        const filename = `${COLLECTION_LOOKUP[collection]}.json`
        const fullpath = path.join(__dirname, DATA_DIRECTORY, filename)
        this.data = JSON.parse(fs.readFileSync(fullpath, 'utf8'))
    }

    getAll<T extends Id>(): Promise<T[]> {
        return Promise.resolve(this.data as T[])
    }
    getById<T extends Id>(id: string): Promise<T> {
        const result = this.data.find(item => item.id === id)
        return Promise.resolve(result as T)
    }
    getOneBy<T extends Id>(_: FilterQuery<any>): Promise<T> {
        throw new Error('Method not implemented.')
    }
    getManyBy<T extends Id>(_: FilterQuery<any>): Promise<T[]> {
        throw new Error('Method not implemented.')
    }
    upsert<T extends Id>(_: T): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(_: string): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
