import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('/api/hitDice', () => {
    let repo: MockRepository

    beforeEach(() => {
        repo = mockRepo()
    })

    it('returns details for all hit dice within the database sorted alphabetically by id', async () => {
        const hitDice = [
            {
                id: '4',
                hitDice: 4,
                damage: '2d6+1'
            },
            {
                id: '0-5',
                hitDice: 0.5,
                damage: '1d4'
            }
        ]
        const withIds = hitDice.map((hitDie) => ({
            ...hitDie,
            _id: '11111111-2222-3333-4444-555555555555'
        }))

        repo.getAll.mockResolvedValue(withIds)

        await request(app)
            .get('/api/hitDice')
            .expect(200)
            .then((response) => {
                const actual = response.body
                expect(actual.length).toEqual(2)
                expect(actual[0]).toEqual(hitDice[1])
                expect(actual[1]).toEqual(hitDice[0])
            })
    })

    it('handles case where the database is empty', (done) => {
        repo.getAll.mockResolvedValue([])

        request(app).get('/api/hitDice').expect(200, []).end(done)
    })
})
