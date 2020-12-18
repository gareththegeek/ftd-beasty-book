import { Express } from 'express'
import monsters from './monsters'
import categories from './categories'
import hitDice from './hitDice'

export default (app: Express): void => {
    monsters(app)
    categories(app)
    hitDice(app)
}
