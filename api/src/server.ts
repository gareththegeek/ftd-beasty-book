import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import { errorHandler } from './middleware/errorHandler'
import { securityHeaders } from './middleware/securityHeaders'
// import { nakedHost } from './middleware/nakedHost'

const app = express()
// app.use(nakedHost)
app.use(cors())
app.use(securityHeaders)

const publicPath =
    process.env.NODE_ENV === 'production'
        ? 'public'
        : 'public/ui/build' /* because copypaths */
app.use(express.static(path.join(__dirname, publicPath)))
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')))

routes(app)

app.get('*', (_, res) =>
    res.sendFile(path.join(__dirname, publicPath, 'index.html'))
)

app.use(errorHandler)

export default app
