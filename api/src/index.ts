require('dotenv').config()
import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'

const port = process.env.PORT ?? 8080
const origin = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000'

const app = express()
app.use(cors())

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; frame-src 'self';")
    res.setHeader('X-Frame-Options', 'sameorigin')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    next()
})

app.use(express.static(path.join(__dirname, 'public')))

routes(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
