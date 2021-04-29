import { Request, Response, NextFunction } from 'express'

const expectedHost = process.env.EXPECTED_HOST

export const nakedHost = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (expectedHost === undefined) {
        next()
        return
    }
    if (req.headers.host !== expectedHost) {
        const newUrl = `${expectedHost}${req.url}`
        console.info(`Redirecting ${req.headers.host}${req.url} -> ${newUrl}`)
        res.redirect(newUrl)
        return
    }
    next()
}
