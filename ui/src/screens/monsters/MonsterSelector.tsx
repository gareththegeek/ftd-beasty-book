import { Box, InputLabel } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { requestMonsterList, selectMonster } from '../../redux/monsters/actions';
import { selectMonsterList } from '../../redux/monsters/selectors';

const MonsterSelector: React.FunctionComponent = () => {

    const dispatch = useDispatch()

    const monsters = useSelector(selectMonsterList)

    useEffect(() => {
        dispatch(requestMonsterList())
    }, [dispatch])

    return (
        <Box m={3}>
            <InputLabel>Search for monsters...</InputLabel>
            <Select
                onChange={(item) => dispatch(selectMonster(item?.value))}
                options={monsters.map(monster => ({
                    label: monster.name,
                    value: monster.id
                }))} />
        </Box>
    )
}

export default MonsterSelector
