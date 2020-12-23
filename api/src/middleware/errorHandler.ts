import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
    error: Error,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    console.error(error)
    res.sendStatus(500)
}
