import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('Error handling middleware', () => {
    const original = console.error
    const expected = new Error('Something bad happened')

    beforeAll(() => {
        console.error = jest.fn()
        const repo = mockRepo()
        repo.delete.mockImplementation(() => {
            throw expected
        })
        repo.getAll.mockImplementation(() => {
            throw expected
        })
        repo.getById.mockImplementation(() => {
            throw expected
        })
        repo.getManyBy.mockImplementation(() => {
            throw expected
        })
        repo.getOneBy.mockImplementation(() => {
            throw expected
        })
        repo.upsert.mockImplementation(() => {
            throw expected
        })
    })

    afterAll(() => {
        console.error = original
    })
    ;[
        '/api/monsters',
        '/api/monsters/some-id',
        '/api/categories',
        '/api/hitDice'
    ].forEach((url) => {
        it(`handles error for '${url}'`, async () => {
            await request(app)
                .get(url)
                .expect(500)
                .then(() => expect(console.error).toBeCalledWith(expected))
        })
    })
})
