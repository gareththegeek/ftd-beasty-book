import { CssBaseline, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MonsterDetail from './MonsterDetail';
import MonsterSelector from './MonsterSelector';
import { requestCategories } from './redux/categories/actions';
import { requestHitDice } from './redux/hitDice/actions';

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
                <Container maxWidth="lg" disableGutters={true}>
                    <MonsterSelector />
                    <MonsterDetail />
                </Container>
            </CssBaseline>
        </React.Fragment>
    )
}

export default App;
