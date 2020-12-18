import { Express } from 'express'
import { getAll } from '../controllers/hitDice'
import { BASE_ROUTE } from './constants'

const HIT_DICE_ROUTE = `${BASE_ROUTE}/hitDice`

export default (app: Express): void => {
    app.route(HIT_DICE_ROUTE).get(getAll)
}
