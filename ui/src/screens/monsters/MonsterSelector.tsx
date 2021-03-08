import { Box, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
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

interface IdValue {
    id: string
    name: string
    hitDice: string | number
}

const toSelectItem = (monster: IdValue) => ({
    label: `${monster.name} [${monster.hitDice}HD]`,
    value: monster.id
})

const MonsterSelector: React.FunctionComponent = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams<{ id: string }>()

    const monsters = useSelector(selectMonsterList)
    const monster = useSelector(selectMonsterViewModel)
    const categories = useSelector(selectCategories)

    useEffect(() => {
        dispatch(requestMonsterList())
    }, [dispatch])

    useEffect(() => {
        dispatch(selectMonster(id))
    }, [dispatch, id])

    return (
        <Box m={1}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Select
                        placeholder="Search for monsters…"
                        value={monster && toSelectItem(monster)}
                        onChange={(item) => history.push(`/${item?.value}`)}
                        options={monsters.map(monster => (toSelectItem(monster)))} />
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
