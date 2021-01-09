import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('/api/monsters/:id', () => {
    let repo: MockRepository

    beforeEach(() => {
        repo = mockRepo()
    })

    it('returns details of monster with specified id', done => {
        const expected = {
            id: 'goblin',
            name: 'Boblin (the)',
            category: 'soldier',
            hitDice: 1,
            hitDiceMod: 2,
            numberAppearing: '2d6',
            speed: 30,
            altSpeed: 60,
            attack: 'dex',
            defence: 'dex',
            description: 'Boblin is a Goblin',
            techniques: ['Bree-yark!']
        }

        repo.getById.mockImplementation((id: string) =>
            Promise.resolve(id === expected.id ? expected : undefined)
        )

        request(app)
            .get(`/api/monsters/${expected.id}`)
            .expect(200, expected)
            .end(done)
    })

    it('excludes mongo _id from response', done => {
        const expected = {
            _id: '11111111-2222-3333-4444-555555555555',
            id: 'goblin'
        }

        repo.getById.mockImplementation((id: string) =>
            Promise.resolve(id === expected.id ? expected : undefined)
        )

        request(app)
            .get(`/api/monsters/${expected.id}`)
            .expect(200, { id: 'goblin' })
            .end(done)
    })

    it('returns 404 when monster with specified id cannot be found', done => {
        repo.getById.mockResolvedValue(undefined)

        request(app).get(`/api/monsters/non-existant-id`).expect(404).end(done)
    })
})
