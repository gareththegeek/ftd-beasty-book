import { Request, Response } from 'express'

export const get = async (_: Request, res: Response): Promise<void> => {
    res.send({ healthy: true })
}
