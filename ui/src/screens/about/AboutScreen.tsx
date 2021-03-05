import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import Source from './Source'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(3),
        width: theme.spacing(3)
    },
    container: {
        backgroundColor: '#fffffe',
        padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
        borderRadius: '8px',
        border: '1px solid #ddd'
    },
    sourceli: {
        listStyleType: 'none',
        marginBottom: theme.spacing(2)
    },
    block: {
        marginBottom: theme.spacing(4)
    },
    head: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4)
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

    return (<div className={classes.container} style={big ? { margin: '32px 0' } : {}}>
        <h1 className={classes.block}>What is Five Monsters Deep?</h1>
        <p className={classes.block}>Five Monsters Deep provides stats of monsters for use with the table top role playing game Five Torches Deep (FTD).</p>
        <p className={classes.block}>Five Torches Deep strips Dungeons &amp; Dragons 5th edition (5e) to its skeleton and fleshes it out with Old School Revival/Rennaisance (OSR) elements. The goal is to provide an old-school experience to those familiar with 5e.</p>
        <p className={classes.block}>The monster stats on this site are based upon 'Old School' systems such as D&amp;D Basic and its retroclones and ported to FTD.</p>
        <h2 className={`${classes.block} ${classes.head}`}>Contribute</h2>
        <p className={classes.block}>The source code for this site is open source, please contribute and report issues</p>
        <ul className={classes.block}>
            <li className={`${classes.sourceli} ${classes.vcentre}`}>
                <i><img src="./github.png" alt="github repository" className={classes.icon} /></i>&nbsp;
                <a target="_new" href="https://github.com/gareththegeek/ftd-beasty-book" title="Contribute and report issues on GitHub!">
                    https://github.com/gareththegeek/ftd-beasty-book
                </a>
            </li>
        </ul>
        <h2 className={`${classes.block} ${classes.head}`}>Sources</h2>
        <p className={classes.block}>The monster stats on this site have been taken from a number of sources, each monster's primary source is indicated with a tag.</p>
        <ul className={classes.block}>
            <li className={classes.sourceli}>🔥 <Source label="basic-fantasy" text="Basic Fantasy 3rd Edition Copyright © Chris Gonnerman" link="https://www.basicfantasy.org/" /></li>
            <li className={classes.sourceli}>🔥 <Source label="basic-set" text="Dungeons &amp; Dragons Basic Set Copyright © Wizards of the Coast" link="https://dnd.wizards.com/" /></li>
            <li className={classes.sourceli}>🔥 <Source label="stonehell" text="Stonehell Dungeon Copyright © Michael Curtis" link="https://poleandrope.blogspot.com/" /></li>
        </ul>
        <p className={`${classes.block} ${classes.head} ${classes.hcentre}`}>Crafted with ❤ by <a target="_new" href="https://github.com/gareththegeek">@gareththegeek</a></p>
    </div>)
}

export default AboutScreen
