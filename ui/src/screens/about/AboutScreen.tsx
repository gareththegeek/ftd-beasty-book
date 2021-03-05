import { makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import Source from './Source'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(3),
        width: theme.spacing(3)
    },
    container: {
        backgroundColor: '#fffffe',
        padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
        borderRadius: theme.spacing(1),
        border: '1px solid #ddd'
    },
    sourceli: {
        listStyleType: 'none',
        marginBottom: theme.spacing(2)
    },
    vcentre: {
        display: 'flex',
        alignItems: 'center'
    },
    hcentre: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const AboutScreen: React.FunctionComponent = () => {
    const classes = useStyles()
    const theme = useTheme()
    const big = useMediaQuery(theme.breakpoints.up('sm'))

    return (<div className={classes.container} style={big ? { margin: '32px 0', paddingLeft: '64px', paddingRight: '64px' } : {}}>
        <Typography variant="h1">What is Five Monsters Deep?</Typography>
        <Typography variant="body1" paragraph>Five Monsters Deep provides stats of monsters for use with the table top role playing game Five Torches Deep (FTD).</Typography>
        <Typography variant="body1" paragraph><a target="_new" href="https://www.fivetorchesdeep.com/">Five Torches Deep</a> strips Dungeons &amp; Dragons 5th edition (5e) to its skeleton and fleshes it out with Old School Revival/Rennaisance (OSR) elements. The goal is to provide an old-school experience to those familiar with 5e.</Typography>
        <Typography variant="body1" paragraph>The monster stats on this site are based upon 'Old School' systems such as D&amp;D Basic and its retroclones and ported to FTD. They should be compatible with any adventure module written for OD&amp;D, Basic D&amp;D, 1e, 2e or any of the many excellent D&amp;D retroclones.</Typography>
        <Typography variant="h2">Contribute</Typography>
        <Typography variant="body1" paragraph>The source code for this site is open source, please contribute and report issues</Typography>
        <ul>
            <li className={`${classes.sourceli} ${classes.vcentre}`}>
                <i><img src="./github.png" alt="github repository" className={classes.icon} /></i>&nbsp;
                <a target="_new" href="https://github.com/gareththegeek/ftd-beasty-book" title="Contribute and report issues on GitHub!">
                    https://github.com/gareththegeek/ftd-beasty-book
                </a>
            </li>
        </ul>
        <Typography variant="h2">Sources</Typography>
        <Typography variant="body1">The monster stats on this site have been taken from a number of sources, each monster's primary source is indicated with a tag.</Typography>
        <ul>
            <li className={classes.sourceli}>🔥 <Source label="basic-fantasy" text="Basic Fantasy 3rd Edition Copyright © Chris Gonnerman" link="https://www.basicfantasy.org/" /></li>
            <li className={classes.sourceli}>🔥 <Source label="basic-set" text="Dungeons &amp; Dragons Basic Set Copyright © Wizards of the Coast" link="https://dnd.wizards.com/" /></li>
            <li className={classes.sourceli}>🔥 <Source label="stonehell" text="Stonehell Dungeon Copyright © Michael Curtis" link="https://poleandrope.blogspot.com/" /></li>
        </ul>
        <Typography variant="body1" paragraph className={classes.hcentre}>Crafted with ❤ by <a target="_new" href="https://github.com/gareththegeek">@gareththegeek</a></Typography>
    </div>)
}

export default AboutScreen
