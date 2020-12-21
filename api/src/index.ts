require('dotenv').config()
import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'

const port = process.env.PORT ?? 8080
const origin = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000'

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    res.header('Content-Security-Policy', 'default-src *')
    res.header('X-Frame-Options', 'sameorigin')
    res.header('X-Content-Type-Options', 'nosniff')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')
    res.header('X-XSS-Protection', '1; mode=block')
    next()
})

routes(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
