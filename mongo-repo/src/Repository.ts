import { MongoClient, FilterQuery, Collection } from 'mongodb'

export interface Id {
    id: string
}

export interface ConnectionConfig {
    mongoUrl: string
    databaseName: string
    collectionName: string
}

export interface IRepository {
    getAll<T extends Id>(): Promise<T[]>
    getById<T extends Id>(id: string): Promise<T>
    /* eslint-disable-next-line */
    getOneBy<T extends Id>(filter: FilterQuery<any>): Promise<T>
    /* eslint-disable-next-line */
    getManyBy<T extends Id>(filter: FilterQuery<any>): Promise<T[]>
    upsert<T extends Id>(data: T): Promise<void>
    delete(id: string): Promise<void>
}

export class Repository implements IRepository {
    private config: ConnectionConfig

    constructor(config: ConnectionConfig) {
        this.config = { ...config }
    }

    private async getClient(): Promise<MongoClient> {
        const { mongoUrl } = this.config
        const client = new MongoClient(mongoUrl)

        return new Promise((resolve, reject) => {
            try {
                client.connect((err) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(client)
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    private async execute<T>(
        operation: (collection: Collection) => Promise<T>
    ): Promise<T> {
        const client = await this.getClient()
        try {
            const { databaseName, collectionName } = this.config
            const database = client.db(databaseName)
            const collection = database.collection(collectionName)

            return await operation(collection)
        } finally {
            client.close()
        }
    }

    async getAll<T extends Id>(): Promise<T[]> {
        return this.execute(
            async (collection) => collection.find().toArray() as Promise<T[]>
        )
    }

    async getById<T extends Id>(id: string): Promise<T> {
        return this.execute(
            async (collection) => collection.findOne({ id }) as Promise<T>
        )
    }

    /* eslint-disable-next-line */
    async getOneBy<T extends Id>(filter: FilterQuery<any>): Promise<T> {
        return this.execute(
            async (collection) => collection.findOne(filter) as Promise<T>
        )
    }

    /* eslint-disable-next-line */
    async getManyBy<T extends Id>(filter: FilterQuery<any>): Promise<T[]> {
        return this.execute(
            async (collection) => collection.find(filter).toArray() as Promise<T[]>
        )
    }

    async upsert<T extends Id>(data: T): Promise<void> {
        await this.execute(async (collection) => {
            const existing = await collection.findOne({ id: data.id })
            if (!existing) {
                await collection.insertOne(data)
            } else {
                await collection.updateOne({ id: data.id }, { $set: data })
            }
        })
    }

    async delete(id: string): Promise<void> {
        await this.execute(async (collection) => collection.deleteOne({ id }))
    }
}
