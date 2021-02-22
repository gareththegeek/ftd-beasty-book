import { Express } from 'express'
import { get } from '../controllers/healthCheck'
import { BASE_ROUTE } from './constants'

const HEALTH_CHECK_ROUTE = `${BASE_ROUTE}/health-check`

export default (app: Express): void => {
    app.route(HEALTH_CHECK_ROUTE).get(get)
}
