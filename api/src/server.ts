require('dotenv').config()
import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'

const origin = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000'

const app = express()
app.use(cors())

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
    )
    res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self';")
    res.setHeader('Feature-Policy', "ambient-light-sensor 'none'; autoplay 'none'; accelerometer 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; encrypted-media 'none'; fullscreen 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; wake-lock 'none'; vr 'none'; xr-spatial-tracking 'none'")
    res.setHeader('Permissions-Policy', "ambient-light-sensor=(), autoplay=(), accelerometer=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker=(), sync-xhr=(), usb=(), wake-lock=(), vr=(), xr-spatial-tracking=()")
    res.setHeader('X-Frame-Options', 'sameorigin')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    next()
})

const publicPath =
    process.env.NODE_ENV === 'production' ? 'public' : 'public/ui/build' // because copypaths
app.use(express.static(path.join(__dirname, publicPath)))

routes(app)

export default app
