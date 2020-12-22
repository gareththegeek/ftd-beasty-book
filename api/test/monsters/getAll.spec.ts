jest.mock('../../src/database/factory')
import * as factory from '../../src/database/factory'
import request from 'supertest'
import app from '../../src/server'
import { Repository } from 'ftd-beasty-book-mongo-repo'

describe('/api/monsters', () => {
    let getAll: jest.Mock
    let getById: jest.Mock
    let getOneBy: jest.Mock
    let getManyBy: jest.Mock

    beforeEach(() => {
        getAll = jest.fn().mockResolvedValue([])
        getById = jest.fn().mockResolvedValue(undefined)
        getOneBy = jest.fn().mockResolvedValue(undefined)
        getManyBy = jest.fn().mockResolvedValue(undefined)

        jest.spyOn(factory, 'get').mockReturnValue(({
            getAll,
            getById,
            getOneBy,
            getManyBy
        } as unknown) as Repository)
    })

    it('should return id, name and hit dice of all monsters within the database sorted alphabetically by name', async (done) => {
        const monsters = [
            {
                id: 'john-the-monster',
                name: 'John the monster',
                category: 'sniper',
                hitDice: 0.5,
                speed: 30,
                attack: 'str',
                defence: 'str',
                description:
                    'This is the description of the monster\nIt has more than one line',
                techniques: ['Technique number one\nhas two lines']
            },
            {
                id: 'deadly-creature-with-brackets',
                name: 'Deadly creature (with brackets)',
                category: 'brute',
                hitDice: 5,
                speed: 50,
                attack: 'dex',
                defence: 'con',
                description: 'A different description',
                techniques: ['Technique 1', 'Technique 2', 'Technique 3']
            }
        ]

        const expected = [
            {
                id: 'deadly-creature-with-brackets',
                name: 'Deadly creature (with brackets)',
                hitDice: 5
            },
            { id: 'john-the-monster', name: 'John the monster', hitDice: 0.5 }
        ]

        getAll.mockResolvedValue(monsters)

        request(app).get('/api/monsters').expect(200, expected).end(done)
    })

    it('should handle case where the database is empty', async (done) => {
        getAll.mockResolvedValue([])

        request(app).get('/api/monsters').expect(200, []).end(done)
    })
})
