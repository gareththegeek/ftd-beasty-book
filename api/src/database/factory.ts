import { Repository } from 'ftd-beasty-book-mongo-repo'
import { Collections, getDatabaseConfig } from './config'

export const get = (collection: Collections): Repository =>
    new Repository(getDatabaseConfig(collection))
