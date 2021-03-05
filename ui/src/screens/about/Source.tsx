import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    chip: {
        margin: '0 4px',
        backgroundColor: theme.palette.info.light
    }
}))

const Source: React.FunctionComponent<{ label: string, text: string, link: string }> = ({ label, text, link }) => {
    const classes = useStyles()

    return (<>
        <Chip size="small" className={classes.chip} label={label} /> - {text} <a target="_new" href={link}>{link}</a>
    </>)
}

export default Source
