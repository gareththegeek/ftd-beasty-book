import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import Source from './Source'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    },
    container: {
        backgroundColor: '#fffffe',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #ddd'
    }
}))

const AboutScreen: React.FunctionComponent = () => {
    const classes = useStyles()
    const theme = useTheme()
    const big = useMediaQuery(theme.breakpoints.up('sm'))

    return (<div className={classes.container} style={big ? { marginTop: '32px' } : {}}>
        <h1>What is Five Monsters Deep?</h1>
        <p>Five Monsters Deep provides stats of monsters for use with the table top role playing game Five Torches Deep (FTD).</p>
        <p>Five Torches Deep strips Dungeons &amp; Dragons 5th edition (5e) to its skeleton and fleshes it out with Old School Revival/Rennaisance (OSR) elements. The goal is to provide an old-school experience to those familiar with 5e.</p>
        <p>The monster stats on this site are based upon 'Old School' systems such as D&amp;D Basic and its retroclones and ported to FTD.</p>
        <h2>Contribute</h2>
        <p>The source code for this site is open source, please contribute and report issues</p>
        <a href="https://github.com/gareththegeek/ftd-beasty-book">
            <i title="Contribute and report issues on GitHub!">
                <img src="./github.png" alt="github repository" className={classes.icon} />
            </i>
            https://github.com/gareththegeek/ftd-beasty-book
        </a>
        <h2>Sources</h2>
        <p>The monster stats on this site have been taken from a number of sources, each monster's primary source is indicated with a tag.</p>
        <ul>
            <li><Source label="basic-fantasy" text="Basic Fantasy 3rd Edition Copyright © Chris Gonnerman" link="https://www.basicfantasy.org/" /></li>
            <li><Source label="basic-set" text="Dungeons &amp; Dragons Basic Set Copyright © Wizards of the Coast" link="https://dnd.wizards.com/" /></li>
            <li><Source label="stonehell" text="Stonehell Dungeon Copyright © Michael Curtis" link="https://poleandrope.blogspot.com/" /></li>
        </ul>
        <p>Crafted with ❤ by <a href="https://github.com/gareththegeek">@gareththegeek</a></p>
    </div>)
}

export default AboutScreen
