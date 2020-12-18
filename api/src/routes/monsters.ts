import { Express } from 'express'
import { get, getAll } from '../controllers/monsters'
import { BASE_ROUTE } from './constants'

const MONSTER_ROUTE = `${BASE_ROUTE}/monsters`

export default (app: Express): void => {
    app.route(MONSTER_ROUTE).get(getAll)
    app.route(`${MONSTER_ROUTE}/:id`).get(get)
}
