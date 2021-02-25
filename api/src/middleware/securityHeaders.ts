import { Request, Response, NextFunction } from 'express'

const origin = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000'

export const securityHeaders = (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
    )
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; connect-src https://dc.services.visualstudio.com/; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self';"
    )
    res.setHeader(
        'Permissions-Policy',
        'ambient-light-sensor=(), autoplay=(), accelerometer=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker=(), sync-xhr=(), usb=(), wake-lock=(), vr=(), xr-spatial-tracking=()'
    )
    res.setHeader('X-Frame-Options', 'sameorigin')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    next()
}
