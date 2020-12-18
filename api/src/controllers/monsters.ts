import { Request, Response } from 'express'
import { Repository } from 'ftd-enchiridion-mongo-repo'
import { Collections, getDatabaseConfig } from '../database/config'
import Monster from '../model/Monster'

export const get = async (req: Request, res: Response) => {
    const repo = new Repository(getDatabaseConfig(Collections.monsters))

    const monster = await repo.getById(req.params.id)

    res.send({
        ...monster,
        _id: undefined
    })
}

export const getAll = async (_: Request, res: Response): Promise<void> => {
    const repo = new Repository(getDatabaseConfig(Collections.monsters))

    const monsters = (await repo.getAll<Monster>())
        .map((monster) => ({
            id: monster.id,
            name: monster.name,
            hitDice: monster.hitDice
        }))
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))

    res.send(monsters)
}
