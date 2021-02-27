import { CssBaseline, Container } from '@material-ui/core'
import React from 'react'
import Banner from './Banner'
import { Route } from 'react-router'
import MonsterScreen from './screens/monsters/MonsterScreen'

const App: React.FunctionComponent = () => (
    <React.Fragment>
        <CssBaseline>
            <Banner />
            <Container maxWidth="lg" disableGutters={true}>
                <Route path="/pies"><h1>waht</h1></Route>
                <Route path="/:id"><MonsterScreen /></Route>
                <Route exact path="/"><MonsterScreen /></Route>
            </Container>
        </CssBaseline>
    </React.Fragment>
)

export default App;
