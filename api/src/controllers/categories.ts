import { NextFunction, Request, Response } from 'express'
import { get } from '../database/factory'
import { Collections } from '../database/config'

export const getAll = async (
    _: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const repo = get(Collections.categories)

        const categories = (await repo.getAll())
            .map((category) => ({
                ...category,
                _id: undefined,
                //TODO adjust the database schema so this isn't necessary
                name: (category as any).category,
                category: undefined
            }))
            .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

        res.send(categories)
    } catch (e: any) {
        next(e)
    }
}
