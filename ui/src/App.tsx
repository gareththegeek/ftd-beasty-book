import { CssBaseline, Container } from '@material-ui/core'
import React from 'react'
import Banner from './Banner'
import { Route, Switch } from 'react-router'
import MonsterScreen from './screens/monsters/MonsterScreen'
import InfoScreen from './screens/about/AboutScreen'

const App: React.FunctionComponent = () => (
    <React.Fragment>
        <CssBaseline>
            <Banner />
            <Container maxWidth="lg" disableGutters={true}>
                <Switch>
                    <Route exact path="/about"><InfoScreen /></Route>
                    <Route path="/:id"><MonsterScreen /></Route>
                    <Route exact path="/"><MonsterScreen /></Route>
                </Switch>
            </Container>
        </CssBaseline>
    </React.Fragment>
)

export default App;
