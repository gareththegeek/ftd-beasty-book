require('dotenv').config()
import * as appInsights from 'applicationinsights'
import app from './server'

const key = process.env.APPINSIGHTS_INSTRUMENTATIONKEY
if (!!key) {
    console.info(`Starting application insights for ${key}`)
    appInsights.setup(key).start()
} else {
    console.warn('No instrumentation key found')
}

const port = process.env.PORT ?? 8080
app.listen(port, () => console.info(`Listening on port ${port}`))
