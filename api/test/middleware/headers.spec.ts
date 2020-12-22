jest.mock('../../src/database/factory')
import * as factory from '../../src/database/factory'
import request from 'supertest'
import app from '../../src/server'
import { Repository } from 'ftd-beasty-book-mongo-repo'

describe('Security headers middleware', () => {
    beforeEach(() => {
        const getAll = jest.fn().mockResolvedValue([])
        const getById = jest.fn().mockResolvedValue(undefined)
        const getOneBy = jest.fn().mockResolvedValue(undefined)
        const getManyBy = jest.fn().mockResolvedValue(undefined)

        jest.spyOn(factory, 'get').mockReturnValue(({
            getAll,
            getById,
            getOneBy,
            getManyBy
        } as unknown) as Repository)
    })
    ;[
        '/api/monsters',
        '/api/monsters/id',
        '/api/categories',
        '/api/hitDice'
    ].forEach((endpoint) => {
        ;[
            {
                key: 'strict-transport-security',
                value: 'max-age=31536000; includeSubDomains; preload'
            },
            {
                key: 'content-security-policy',
                value:
                    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self';"
            },
            {
                key: 'feature-policy',
                value:
                    "ambient-light-sensor 'none'; autoplay 'none'; accelerometer 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; encrypted-media 'none'; fullscreen 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; wake-lock 'none'; vr 'none'; xr-spatial-tracking 'none'"
            },
            {
                key: 'permissions-policy',
                value:
                    'ambient-light-sensor=(), autoplay=(), accelerometer=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker=(), sync-xhr=(), usb=(), wake-lock=(), vr=(), xr-spatial-tracking=()'
            },
            { key: 'x-frame-options', value: 'sameorigin' },
            { key: 'x-content-type-options', value: 'nosniff' },
            { key: 'referrer-policy', value: 'no-referrer-when-downgrade' },
            { key: 'x-xss-protection', value: '1; mode=block' }
        ].forEach((header) => {
            it('should include Strict-Transport-Security header', async (done) => {
                request(app)
                    .get(endpoint)
                    .expect((res) => {
                        expect(res.headers[header.key]).toBe(header.value)
                    })
                    .end(done)
            })
        })
    })
})
