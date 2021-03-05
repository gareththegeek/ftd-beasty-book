import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectMonsterViewModel } from '../../redux/monsters/selectors'

const useStyles = makeStyles(theme => ({
    td: {
        paddingRight: theme.spacing(2)
    }
}))

const MonsterModifiers = () => {
    const classes = useStyles()
    const monster = useSelector(selectMonsterViewModel)

    if (!monster) {
        return <></>
    }

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.td} align="center" title="Strength Modifier">STR</TableCell>
                        <TableCell className={classes.td} align="center" title="Dexterity Modifier">DEX</TableCell>
                        <TableCell className={classes.td} align="center" title="Constitution Modifier">CON</TableCell>
                        <TableCell className={classes.td} align="center" title="Intelligence Modifier">INT</TableCell>
                        <TableCell className={classes.td} align="center" title="Wisdom Modifier">WIS</TableCell>
                        <TableCell className={classes.td} align="center" title="Charisma Modifier">CHA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.td} align="center">{monster.str}</TableCell>
                        <TableCell className={classes.td} align="center">{monster.dex}</TableCell>
                        <TableCell className={classes.td} align="center">{monster.con}</TableCell>
                        <TableCell className={classes.td} align="center">{monster.int}</TableCell>
                        <TableCell className={classes.td} align="center">{monster.wis}</TableCell>
                        <TableCell className={classes.td} align="center">{monster.cha}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MonsterModifiers
