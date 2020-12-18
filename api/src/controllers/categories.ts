import { Request, Response } from 'express'
import { Repository } from 'ftd-enchiridion-mongo-repo'
import { Collections, getDatabaseConfig } from '../database/config'

export const getAll = async (_: Request, res: Response): Promise<void> => {
    const repo = new Repository(getDatabaseConfig(Collections.categories))

    const categories = (await repo.getAll())
        .map((category) => ({
            ...category,
            _id: undefined
        }))
        .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

    res.send(categories)
}
