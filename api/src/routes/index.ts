import { Express } from 'express'
import monsters from './monsters'

export default (app: Express): void => {
    monsters(app)
}
