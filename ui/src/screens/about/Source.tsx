import { Chip, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Link from '../../components/Link'

const useStyles = makeStyles(theme => ({
    chip: {
        margin: `0 ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.info.light
    }
}))

const Source: React.FunctionComponent<{ label: string, text: string, link: string }> = ({ label, text, link }) => {
    const classes = useStyles()

    return (<>
        <Chip size="small" className={classes.chip} label={label} /> <Typography variant="body1">{text} - <Link target="_new" href={link}>{link}</Link></Typography>
    </>)
}

export default Source
