import { makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectMonsterViewModel } from '../../redux/monsters/selectors'

const useStyles = makeStyles(theme => ({
    td: {
        paddingRight: theme.spacing(2)
    }
}))

const MonsterStats = () => {
    const classes = useStyles()
    const monster = useSelector(selectMonsterViewModel)

    if (!monster) {
        return <></>
    }

    return (<TableContainer>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.td} align="center">Speed</TableCell>
                    <TableCell className={classes.td} align="center">Damage</TableCell>
                    <TableCell className={classes.td} align="center" title="Armour Class">AC</TableCell>
                    <TableCell className={classes.td} align="center" title="Hit Points">HP</TableCell>
                    <TableCell className={classes.td} align="center">Morale</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell className={classes.td} align="center">{monster.speed}</TableCell>
                    <TableCell className={classes.td} align="center">{monster.damage}</TableCell>
                    <TableCell className={classes.td} align="center" title={`10 + ${monster.defenceAttribute.toUpperCase()}`}>{monster.armourClass}</TableCell>
                    <TableCell className={classes.td} align="center" title={`${monster.hitPointsFormula} hp`}>{monster.hitPoints}</TableCell>
                    <TableCell className={classes.td} align="center">{monster.morale}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>)
}

export default MonsterStats
