import { NextFunction, Request, Response } from 'express'
import { get } from '../database/factory'
import { Collections } from '../database/config'

export const getAll = async (
    _: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const repo = get(Collections.hitdice)

        const hitDice = (await repo.getAll())
            .map((hitDice) => ({
                ...hitDice,
                _id: undefined
            }))
            .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

        res.send(hitDice)
    } catch (e) {
        next(e)
    }
}
