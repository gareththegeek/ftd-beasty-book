import { mockRepo, MockRepository } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('Error handling middleware', () => {
    const original = console.error

    beforeAll(() => {
        console.error = jest.fn()
        const repo = mockRepo()
        repo.delete.mockImplementation(() => {
            throw new Error('Something bad happened')
        })
        repo.getAll.mockImplementation(() => {
            throw new Error('Something bad happened')
        })
        repo.getById.mockImplementation(() => {
            throw new Error('Something bad happened')
        })
        repo.getManyBy.mockImplementation(() => {
            throw new Error('Something bad happened')
        })
        repo.getOneBy.mockImplementation(() => {
            throw new Error('Something bad happened')
        })
        repo.upsert.mockImplementation(() => {
            throw new Error('Something bad happened')
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
        it(`handles error for '${url}'`, (done) => {
            request(app).get(url).expect(500).end(done)
        })
    })
})
