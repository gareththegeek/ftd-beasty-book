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
    next()
})

routes(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
