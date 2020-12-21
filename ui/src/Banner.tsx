import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    }
}))

const Banner: React.FunctionComponent = () => {
    const classes = useStyles()

    return (<header>
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <h2>FTD Beasty Book</h2>
                </Grid>
                <Grid container justify="flex-end">
                    <i title="Contribute and report issues on GitHub!"><a href="https://github.com/gareththegeek/ftd-beasty-book"><img src="./github.png" alt="github repository" className={classes.icon} /></a></i>
                </Grid>
            </Toolbar>
        </AppBar>
    </header>)
}

export default Banner
