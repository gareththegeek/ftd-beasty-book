import { Box, CircularProgress, Container, Grid, makeStyles, Select, MenuItem } from '@material-ui/core'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from '../../redux/categories/Category'
import { selectCategories } from '../../redux/categories/selectors'
import { selectMonsterCategory } from '../../redux/monsters/actions'
import { CategoryType } from '../../redux/monsters/CategoryType'
import { selectMonsterLoading, selectMonsterViewModel } from '../../redux/monsters/selectors'

const useStyles = makeStyles(theme => ({
    padded: {
        padding: theme.spacing(2),
        height: "100%"
    },
    spinner: {
        width: "100%",
        textAlign: "center"
    }
}))

const renderParagraphs = (text: string): JSX.Element[] =>
    text.split('\n').map((paragraph, index) => (<p key={`para-${index}`}>{paragraph}</p>))

const renderCategoryOptions = (categories: Category[]) =>
    categories.map(category =>
        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
    )

const MonsterDetail: React.FunctionComponent = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const loading = useSelector(selectMonsterLoading)
    const monster = useSelector(selectMonsterViewModel)
    const categories = useSelector(selectCategories)
    
    if (loading) {
        return (<Container className={classes.spinner}>
            <CircularProgress />
        </Container>)
    }

    if (!monster) {
        return (<div />)
    }

    return (
        <div>
            <Box m={3}>
                <Paper className={classes.padded}>
                    <h1>{monster.name}</h1>
                    <Select
                        value={monster.category.toLowerCase()}
                        onChange={(e) => dispatch(selectMonsterCategory(e.target.value as CategoryType))}
                    >
                        {renderCategoryOptions(categories)}
                    </Select>
                </Paper>
            </Box>
            <Box m={3}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Speed</TableCell>
                                <TableCell align="center">To Hit</TableCell>
                                <TableCell align="center">Damage</TableCell>
                                <TableCell align="center">AC</TableCell>
                                <TableCell align="center">HP</TableCell>
                                <TableCell align="center">HD</TableCell>
                                <TableCell align="center">Morale</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">{monster.speed}</TableCell>
                                <TableCell align="center">{monster.toHit}</TableCell>
                                <TableCell align="center">{monster.damage}</TableCell>
                                <TableCell align="center">{monster.armourClass}</TableCell>
                                <TableCell align="center">{monster.hitPoints}</TableCell>
                                <TableCell align="center">{monster.hitDice}</TableCell>
                                <TableCell align="center">{monster.morale}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box m={3}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STR</TableCell>
                                <TableCell align="center">DEX</TableCell>
                                <TableCell align="center">CON</TableCell>
                                <TableCell align="center">INT</TableCell>
                                <TableCell align="center">WIS</TableCell>
                                <TableCell align="center">CHA</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">{monster.str}</TableCell>
                                <TableCell align="center">{monster.dex}</TableCell>
                                <TableCell align="center">{monster.con}</TableCell>
                                <TableCell align="center">{monster.int}</TableCell>
                                <TableCell align="center">{monster.wis}</TableCell>
                                <TableCell align="center">{monster.cha}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box m={3}>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Paper className={classes.padded}>
                            <h3>Description</h3>
                            {renderParagraphs(monster.description)}
                        </Paper>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <Paper className={classes.padded}>
                            <h3>Strong</h3>
                            {renderParagraphs(monster.strong)}
                        </Paper>
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <Paper className={classes.padded}>
                            <h3>Weak</h3>
                            {renderParagraphs(monster.weak)}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box m={3}>
                <Grid container spacing={3}>
                    {monster.techniques.map((technique, index) => (
                        <Grid item key={index.toString()} md={4} xs={12}>
                            <Paper className={classes.padded}>
                                <h3>Technique</h3>
                                {renderParagraphs(technique)}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default MonsterDetail
