import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('/api/categories', () => {
    let repo: MockRepository

    beforeEach(() => {
        repo = mockRepo()
    })

    it('returns details for all categories within the database sorted alphabetically by id', async () => {
        const categories = [
            {
                id: 'sniper',
                category: 'Sniper',
                str: 'weak',
                dex: 'strong',
                con: 'weak',
                int: 'average',
                wis: 'strong',
                cha: 'average',
                morale: 'weak',
                strong: 'Ranged combat\nPerception',
                weak: 'Melee combat'
            },
            {
                id: 'brute',
                category: 'Brute',
                str: 'strong',
                dex: 'weak',
                con: 'strong',
                int: 'weak',
                wis: 'normal',
                cha: 'normal',
                morale: 'strong',
                strong: 'Holding the line\nResistance',
                weak: 'Stealth\nFinesse\netc.'
            }
        ]
        const withIds = categories.map((category) => ({
            ...category,
            _id: '11111111-2222-3333-4444-555555555555'
        }))

        repo.getAll.mockResolvedValue(withIds)

        await request(app)
            .get('/api/categories')
            .expect(200)
            .then((response) => {
                const actual = response.body
                expect(actual.length).toEqual(2)
                expect(actual[0]).toEqual(categories[1])
                expect(actual[1]).toEqual(categories[0])
            })
    })

    it('handles case where the database is empty', (done) => {
        repo.getAll.mockResolvedValue([])

        request(app).get('/api/categories').expect(200, []).end(done)
    })
})
