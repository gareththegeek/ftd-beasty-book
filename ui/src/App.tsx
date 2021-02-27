import { CssBaseline, Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Banner from './Banner'
import { requestCategories } from './redux/categories/actions'
import { requestHitDice } from './redux/hitDice/actions'
import { Route } from 'react-router'
import MonsterScreen from './screens/monsters/MonsterScreen'

const App: React.FunctionComponent = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestHitDice())
    }, [dispatch])

    useEffect(() => {
        dispatch(requestCategories())
    }, [dispatch])

    return (
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
}

export default App;
