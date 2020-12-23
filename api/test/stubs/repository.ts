jest.mock('../../src/database/factory')
import * as factory from '../../src/database/factory'
import { Repository } from 'ftd-beasty-book-mongo-repo'

export interface MockRepository extends Repository {
    getAll: jest.Mock<Promise<any[]>, []>
    getById: jest.Mock<Promise<any | undefined>, [string]>
    getOneBy: jest.Mock<Promise<any | undefined>, [any]>
    getManyBy: jest.Mock<Promise<any[]>, [any]>
    delete: jest.Mock<Promise<void>, [any]>
    upsert: jest.Mock<Promise<void>, [any]>
}

export const buildRepo = (): MockRepository =>
    ({
        getAll: jest.fn().mockResolvedValue([]),
        getById: jest.fn().mockResolvedValue(undefined),
        getOneBy: jest.fn().mockResolvedValue(undefined),
        getManyBy: jest.fn().mockResolvedValue([]),
        delete: jest.fn().mockResolvedValue(undefined),
        upsert: jest.fn().mockResolvedValue(undefined)
    } as MockRepository)

export const mockRepo = (): MockRepository => {
    const result = buildRepo()
    jest.spyOn(factory, 'get').mockReturnValue(result)
    return result
}
