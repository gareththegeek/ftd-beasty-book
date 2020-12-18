require('dotenv').config()
import express from 'express'
import routes from './routes'

const port = process.env.PORT ?? 8080

const app = express()

routes(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
