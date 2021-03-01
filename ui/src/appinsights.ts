import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const instrumentationKey = process.env.REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY

if (!!instrumentationKey) {
    const appInsights = new ApplicationInsights({
        config: {
            instrumentationKey
            /* ...Other Configuration Options... */
        }
    })
    appInsights.loadAppInsights()
    appInsights.trackPageView() // Manually call trackPageView to establish the current user/session/pageview
}
