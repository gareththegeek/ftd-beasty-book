import { Box, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Category from '../../redux/categories/Category'
import { selectCategories } from '../../redux/categories/selectors'
import { requestMonsterList, selectMonster, selectMonsterCategory } from '../../redux/monsters/actions'
import { CategoryType } from '../../redux/monsters/CategoryType'
import { selectMonsterList, selectMonsterViewModel } from '../../redux/monsters/selectors'

const mapCategoryToOption = (category?: Category) => ({
    value: category?.id,
    label: category?.name
})

const MonsterSelector: React.FunctionComponent = () => {

    const dispatch = useDispatch()

    const monsters = useSelector(selectMonsterList)
    const monster = useSelector(selectMonsterViewModel)
    const categories = useSelector(selectCategories)

    useEffect(() => {
        dispatch(requestMonsterList())
    }, [dispatch])

    return (
        <Box m={1}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Select
                        onChange={(item) => dispatch(selectMonster(item?.value))}
                        options={monsters.map(monster => ({
                            label: monster.name,
                            value: monster.id
                        }))} />
                </Grid>
                <Grid item xs={4}>
                    <Select
                        isDisabled={!monster}
                        value={mapCategoryToOption(
                            categories.find(category => category.id === monster?.category?.toLowerCase())
                        )}
                        onChange={(item) => dispatch(selectMonsterCategory(item?.value as CategoryType))}
                        options={categories.map(mapCategoryToOption)}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default MonsterSelector
