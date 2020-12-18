import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import './App.css';
import { requestMonsterList } from './redux/monsters/actions';
import { selectMonsterList } from './redux/monsters/selectors';

const App: React.FunctionComponent = () => {

    const dispatch = useDispatch()

    const monsters = useSelector(selectMonsterList)

    useEffect(() => {
        console.log('dispatching')
        console.log(requestMonsterList())
        dispatch(requestMonsterList())
    }, [dispatch])

    return (
        <div className="App">
            <Select options={monsters.map(monster => ({
                label: monster.name,
                value: monster.id
            }))} />
        </div>
    )
}

export default App;
