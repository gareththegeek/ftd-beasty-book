import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Body1, H1, H2, Link } from '../../components'
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
        border: '1px solid #ddd',
        [theme.breakpoints.up('sm')]: {
            margin: `${theme.spacing(4)}px 0`,
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8)
        }
    },
    sourceli: {
        listStyleType: 'none',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignContent: 'center'
        }
    },
    vcentre: {
        display: 'flex',
        alignContent: 'center'
    },
    hcentre: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const AboutScreen: React.FunctionComponent = () => {
    const {
        icon,
        container,
        sourceli,
        vcentre,
        hcentre
    } = useStyles()

    return (<div className={container}>
        <H1>What is Five Monsters Deep?</H1>
        <Body1>Five Monsters Deep provides stats of monsters for use with the table top role playing game Five Torches Deep (FTD).</Body1>
        <Body1><Link target="_new" href="https://www.fivetorchesdeep.com/">Five Torches Deep</Link> strips Dungeons &amp; Dragons 5th edition (5e) to its skeleton and fleshes it out with Old School Revival/Rennaisance (OSR) elements. The goal is to provide an old-school experience to those familiar with 5e.</Body1>
        <Body1>The monster stats on this site are based upon 'Old School' systems such as D&amp;D Basic and its retroclones and ported to FTD. They should be compatible with any adventure module written for OD&amp;D, Basic D&amp;D, 1e, 2e or any of the many excellent D&amp;D retroclones.</Body1>
        <H2>Contribute</H2>
        <Body1>The source code for this site is open source, please contribute and report issues</Body1>
        <ul>
            <li className={`${sourceli} ${vcentre}`}>
                <i><img src="./github.png" alt="github repository" className={icon} /></i>&nbsp;
                <Typography>
                    <Link target="_new" href="https://github.com/gareththegeek/ftd-beasty-book" title="Contribute and report issues on GitHub!">
                        https://github.com/gareththegeek/ftd-beasty-book
                    </Link>
                </Typography>
            </li>
        </ul>
        <H2>Sources</H2>
        <Body1>The monster stats on this site have been taken from a number of sources, each monster's primary source is indicated with a tag.</Body1>
        <ul>
            <li className={sourceli}>
                🔥 <Source label="basic-fantasy" text="Basic Fantasy 3rd Edition" copyright="Copyright © Chris Gonnerman" link="https://www.basicfantasy.org/" />
            </li>
            <li className={sourceli}>
                🔥 <Source label="labyrinth-lord" text="Labyrinth Lord" copyright="Copyright © Daniel Proctor Goblinoid Games" link="https://goblinoidgames.com/" />
            </li>
            <li className={sourceli}>
                🔥 <Source label="basic-set" text="Dungeons &amp; Dragons Basic Set" copyright="Copyright © Wizards of the Coast" link="https://dnd.wizards.com/" />
            </li>
            <li className={sourceli}>
                🔥 <Source label="stonehell" text="Stonehell Dungeon" copyright="Copyright © Michael Curtis" link="https://poleandrope.blogspot.com/" />
            </li>
            <li className={sourceli}>
                🔥 <Source label="barrowmaze" text="Barrowmaze" copyright="Copyright © Greg Gillespie" link="https://www.drivethrurpg.com/product/139762/Barrowmaze-Complete" />
            </li>
            <li className={sourceli}>
                🔥 <Source label="hole-in-the-oak" text="The Hole in the Oak" copyright="Copyright © Gavin Norman" link="https://necroticgnome.com/" />
            </li>
            <li className={sourceli}>
                🔥 <Source label="pod-caverns" text="The Pod-Caverns of the Sinister Shroom" copyright="Copyright © Matthew Finch" link="https://www.drivethrurpg.com/product/13709/Advanced-Adventures-1-The-PodCaverns-of-the-Sinister-Shroom" />
            </li>
        </ul>
        <Body1 className={hcentre}>Crafted with ❤ by <Link target="_new" href="https://github.com/gareththegeek">@gareththegeek</Link></Body1>
    </div>)
}

export default AboutScreen
