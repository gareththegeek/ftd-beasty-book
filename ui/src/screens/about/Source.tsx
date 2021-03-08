import { Chip, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { Body1 } from '../../components'
import Link from '../../components/Link'

const useStyles = makeStyles(theme => ({
    chip: {
        margin: `0 ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.info.light
    }
}))

const Source: React.FunctionComponent<{ label: string, text: string, copyright: string, link: string }> = ({ label, text, copyright, link }) => {
    const classes = useStyles()
    const theme = useTheme()
    const breakline = useMediaQuery(theme.breakpoints.down('sm'))

    return (<>
        <Chip size="small" className={classes.chip} label={label} /> <Body1><span>{text}</span>&nbsp;<span style={{ display: breakline ? 'inline-block' : 'inline' }}>{copyright}</span>&nbsp;<Link target="_new" href={link}>{link}</Link></Body1>
    </>)
}

export default Source
