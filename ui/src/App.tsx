import { CssBaseline, Container, ThemeProvider, createMuiTheme } from '@material-ui/core'
import React from 'react'
import Banner from './Banner'
import { Route, Switch } from 'react-router'
import MonsterScreen from './screens/monsters/MonsterScreen'
import InfoScreen from './screens/about/AboutScreen'
import { cyan, yellow } from '@material-ui/core/colors'

const theme = createMuiTheme({
    typography: {
        fontSize: 16,
        allVariants: {
            fontWeight: 300,
            color: '#233',
            marginBottom: '2rem'
        },
        h1: {
            fontSize: '3rem'
        },
        h2: {
            fontSize: '2rem'
        },
        h3: {
            fontWeight: 400,
            fontSize: '1.5rem'
        },
        h4: {
            fontSize: '1.25rem'
        },
        body1: {
            fontSize: '1rem'
        }
    },
    palette: {
        primary: {
            main: cyan[700]
        },
        info: {
            main: yellow[700]
        },
        text: {
            primary: '#233'
        }
    },
});

const App: React.FunctionComponent = () => (
    <React.Fragment>
        <CssBaseline>
            <ThemeProvider theme={theme}>
                <Banner />
                <Container maxWidth="md" disableGutters={true}>
                    <Switch>
                        <Route exact path="/about"><InfoScreen /></Route>
                        <Route path="/:id"><MonsterScreen /></Route>
                        <Route exact path="/"><MonsterScreen /></Route>
                    </Switch>
                </Container>
            </ThemeProvider>
        </CssBaseline>
    </React.Fragment>
)

export default App;
