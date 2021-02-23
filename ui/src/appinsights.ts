import { ApplicationInsights } from '@microsoft/applicationinsights-web'

if (!!process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    const appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY
            /* ...Other Configuration Options... */
        }
    })
    appInsights.loadAppInsights()
    appInsights.trackPageView() // Manually call trackPageView to establish the current user/session/pageview
}
