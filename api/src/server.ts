import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import { errorHandler } from './middleware/errorHandler'
import { securityHeaders } from './middleware/securityHeaders'

const app = express()
app.use(cors())

app.use(securityHeaders)

if (process.env.NODE_ENV !== 'production') {
    app.use(
        express.static(
            path.join(__dirname, 'public/ui/build' /* because copypaths */)
        )
    )
}

routes(app)

app.use(errorHandler)

export default app
