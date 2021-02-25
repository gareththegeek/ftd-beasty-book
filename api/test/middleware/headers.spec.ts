import { mockRepo } from '../stubs/repository'
import request from 'supertest'
import app from '../../src/server'

describe('Security headers middleware', () => {
    beforeEach(() => {
        mockRepo()
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
                    "default-src 'self'; connect-src https://dc.services.visualstudio.com/; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self';"
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
            it('includes Strict-Transport-Security header', done => {
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
