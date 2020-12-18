import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
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
        <div className="App">
            <MonsterSelector />
            <MonsterDetail />
        </div>
    )
}

export default App;
