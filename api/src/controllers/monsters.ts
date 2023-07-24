import { NextFunction, Request, Response } from 'express'
import { get as getDb } from '../database/factory'
import { Collections } from '../database/config'
import Monster from '../model/Monster'

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = getDb(Collections.monsters)

        const monster = await repo.getById(req.params.id)

        if (!monster) {
            res.sendStatus(404)
            return
        }

        res.send({
            ...monster,
            _id: undefined
        })
    } catch (e: any) {
        next(e)
    }
}

export const getAll = async (
    _: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const repo = getDb(Collections.monsters)

        const monsters = (await repo.getAll<Monster>())
            .map((monster) => ({
                id: monster.id,
                name: monster.name,
                hitDice: monster.hitDice
            }))
            .filter(monster => !!monster.id)
            .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))

        res.send(monsters)
    } catch (e: any) {
        next(e)
    }
}
