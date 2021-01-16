import { IRepository, Repository } from 'ftd-beasty-book-mongo-repo'
import { Collections, getDatabaseConfig } from './config'
import { Fauxpository } from './Fauxpository'

export const getFaux = (collection: Collections): IRepository =>
    new Fauxpository(collection)

export const getReal = (collection: Collections): IRepository =>
    new Repository(getDatabaseConfig(collection))

export const get = getFaux
