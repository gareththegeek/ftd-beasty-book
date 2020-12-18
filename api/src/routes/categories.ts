import { Express } from 'express'
import { getAll } from '../controllers/categories'
import { BASE_ROUTE } from './constants'

const CATEGORY_ROUTE = `${BASE_ROUTE}/categories`

export default (app: Express): void => {
    app.route(CATEGORY_ROUTE).get(getAll)
}
