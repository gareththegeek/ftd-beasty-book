require('dotenv').config()
import * as appInsights from 'applicationinsights'
import app from './server'

const key = process.env.INSTRUMENTATION_KEY
if (!!key) {
    console.log(`Starting application insights for ${key}`)
    appInsights.setup(key).start()
}

const port = process.env.PORT ?? 8080
app.listen(port, () => console.log(`Listening on port ${port}`))
