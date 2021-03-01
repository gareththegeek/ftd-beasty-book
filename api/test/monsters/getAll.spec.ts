import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('/api/monsters', () => {
    let repo: MockRepository

    beforeEach(() => {
        repo = mockRepo()
    })

    it('returns id, name and hit dice of all monsters within the database sorted alphabetically by name', (done) => {
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
                techniques: ['Technique number one\nhas two lines'],
                tags: ['humanoid']
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
                techniques: ['Technique 1', 'Technique 2', 'Technique 3'],
                tags: ['basic-fantasy', 'humanoid']
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

    it('handles case where the database is empty', (done) => {
        repo.getAll.mockResolvedValue([])

        request(app).get('/api/monsters').expect(200, []).end(done)
    })

    it('does not return blank monsters', (done) => {
        const expected = [{ id: 'goblin' }]
        const unexpected = [{ id: undefined }, { id: undefined }]
        repo.getAll.mockResolvedValue([...unexpected, ...expected])

        request(app).get('/api/monsters').expect(200, expected).end(done)
    })
})
