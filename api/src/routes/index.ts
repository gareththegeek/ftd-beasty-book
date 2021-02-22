import { Express } from 'express'
import monsters from './monsters'
import categories from './categories'
import hitDice from './hitDice'
import healthCheck from './healthCheck'

export default (app: Express): void => {
    monsters(app)
    categories(app)
    hitDice(app)
    healthCheck(app)
}
