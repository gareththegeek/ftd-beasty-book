import { Box, CircularProgress, Container, Grid, makeStyles } from '@material-ui/core'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectMonsterLoading, selectMonsterViewModel } from '../../redux/monsters/selectors'

const useStyles = makeStyles(theme => ({
    spinner: {
        width: "100%",
        textAlign: "center"
    },
    light: {
        color: theme.palette.info.light
    },
    td: {
        paddingRight: "16px"
    }
}))

const renderParagraphs = (text: string): JSX.Element[] =>
    text.split('\n').map((paragraph, index) => (<p key={`para-${index}`}>{paragraph}</p>))

const formatModifier = (modifier: number): string =>
    modifier < 0 ? `${modifier}` : `+${modifier}`

const MonsterDetail: React.FunctionComponent = () => {

    const classes = useStyles()
    const loading = useSelector(selectMonsterLoading)
    const monster = useSelector(selectMonsterViewModel)

    if (loading) {
        return (<Container className={classes.spinner}>
            <CircularProgress />
        </Container>)
    }

    if (!monster) {
        return (<div />)
    }

    return (
        <Box component={Paper}>
            <Box m={1}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.td} align="center">Speed</TableCell>
                                <TableCell className={classes.td} align="center">Damage</TableCell>
                                <TableCell className={classes.td} align="center">AC</TableCell>
                                <TableCell className={classes.td} align="center">HP</TableCell>
                                <TableCell className={classes.td} align="center">Morale</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.td} align="center">{monster.speed}</TableCell>
                                <TableCell className={classes.td} align="center">{monster.damage}</TableCell>
                                <TableCell className={classes.td} align="center">{monster.armourClass}</TableCell>
                                <TableCell className={classes.td} align="center">{monster.hitPoints}</TableCell>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.morale)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box m={1}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.td} align="center">STR</TableCell>
                                <TableCell className={classes.td} align="center">DEX</TableCell>
                                <TableCell className={classes.td} align="center">CON</TableCell>
                                <TableCell className={classes.td} align="center">INT</TableCell>
                                <TableCell className={classes.td} align="center">WIS</TableCell>
                                <TableCell className={classes.td} align="center">CHA</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.str)}</TableCell>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.dex)}</TableCell>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.con)}</TableCell>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.int)}</TableCell>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.wis)}</TableCell>
                                <TableCell className={classes.td} align="center">{formatModifier(monster.cha)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <h2>{monster.name} <span className={classes.light}>HD {monster.hitDice}</span></h2>
                        {renderParagraphs(monster.description)}
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <h3>Strong</h3>
                        {renderParagraphs(monster.strong)}
                    </Grid>
                    <Grid item sm={3} xs={6}>
                        <h3>Weak</h3>
                        {renderParagraphs(monster.weak)}
                    </Grid>
                </Grid>
            </Box>
            <Box m={2}>
                <Grid container spacing={2}>
                    {monster.techniques.map((technique, index) => (
                        <Grid item key={index.toString()} sm={4} xs={12}>
                            <h3>Technique</h3>
                            {renderParagraphs(technique)}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box >
    )
}

export default MonsterDetail
