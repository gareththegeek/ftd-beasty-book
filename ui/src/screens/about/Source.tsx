import { Chip, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { Body1 } from '../../components'
import Link from '../../components/Link'

const useStyles = makeStyles(theme => ({
    chip: {
        margin: `0 ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.secondary.light
    },
    sourcetext: {
        display: 'inline',
        [theme.breakpoints.down('sm')]: {
            display: 'inline-block',
            textAlign: 'left'
        }
    }
}))

const Source: React.FunctionComponent<{ label: string, text: string, copyright: string, link: string }> = ({ label, text, copyright, link }) => {
    const { sourcetext, chip } = useStyles()

    return (<>
        <Chip size="small" className={chip} label={label} /> <Body1><span className={sourcetext}>{text}</span>&nbsp;<span className={sourcetext}>{copyright}</span>&nbsp;<Link target="_new" href={link}>{link}</Link></Body1>
    </>)
}

export default Source
