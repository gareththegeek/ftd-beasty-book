import { Request, Response } from 'express'
import { get } from '../database/factory'
import { Collections } from '../database/config'

export const getAll = async (_: Request, res: Response): Promise<void> => {
    const repo = get(Collections.hitdice)

    const hitDice = (await repo.getAll())
        .map((hitDice) => ({
            ...hitDice,
            _id: undefined
        }))
        .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))

    res.send(hitDice)
}
