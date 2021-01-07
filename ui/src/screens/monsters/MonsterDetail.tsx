import { Box, CircularProgress, Container, Grid, makeStyles } from '@material-ui/core'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { ReactInstance, RefObject, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectMonsterLoading, selectMonsterViewModel } from '../../redux/monsters/selectors'
import ShowMoreText from 'react-show-more-text'
import domtoimage from 'dom-to-image'
import { Button } from '@material-ui/core'
import SaveAlt from '@material-ui/icons/SaveAlt'
import { IconButton } from '@material-ui/core'

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
    const componentRef = useRef<typeof Grid>() as unknown as RefObject<ReactInstance>

    const saveImage = async () => {
        if (!monster) {
            return
        }

        const dataUrl = await domtoimage.toPng(componentRef.current as Node)
        const link = document.createElement('a')
        link.download = `${monster.id}.png`
        link.href = dataUrl
        link.click()
    }

    if (loading) {
        return (<Container className={classes.spinner}>
            <CircularProgress />
        </Container>)
    }

    if (!monster) {
        return (<div />)
    }

    return (
        <Grid container spacing={2} component={Paper} ref={componentRef}>
            <Grid item md={6} xs={12}>
                <Box m={2}>
                    <h2>{monster.name} <span className={classes.light}>HD {monster.hitDice}</span>
                        <IconButton disabled={!monster} onClick={() => saveImage()} title="Export to image" href="#">
                            <SaveAlt></SaveAlt>
                        </IconButton>
                    </h2>
                    <ShowMoreText
                        lines={1}
                        more="Show description">
                        {renderParagraphs(monster.description)}
                    </ShowMoreText>
                </Box>
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item sm={2} xs={6}>
                <Box m={2}>
                    <h3>Strong</h3>
                    {renderParagraphs(monster.strong)}
                </Box>
            </Grid>
            <Grid item sm={2} xs={6}>
                <Box m={2}>
                    <h3>Weak</h3>
                    {renderParagraphs(monster.weak)}
                </Box>
            </Grid>
            {monster.techniques.map((technique, index) => (
                <Grid item key={index.toString()} sm={2} xs={12}>
                    <Box m={2}>
                        <h3>Technique</h3>
                        {renderParagraphs(technique)}
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}

export default MonsterDetail
