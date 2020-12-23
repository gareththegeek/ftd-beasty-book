import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('/api/monsters', () => {
    let repo: MockRepository

    beforeEach(() => {
        repo = mockRepo()
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

        repo.getAll.mockResolvedValue(monsters)

        request(app).get('/api/monsters').expect(200, expected).end(done)
    })

    it('should handle case where the database is empty', async (done) => {
        repo.getAll.mockResolvedValue([])

        request(app).get('/api/monsters').expect(200, []).end(done)
    })
})
