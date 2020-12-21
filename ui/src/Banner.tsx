import { AppBar, Box, Grid, makeStyles, Toolbar } from '@material-ui/core'
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
                <Grid container justify="space-between">
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item>
                                <i title="Contribute and report issues on GitHub!">
                                    <img src="./android-chrome-192x192.png" alt="Beasty Book" className={classes.icon} />
                                </i>
                            </Grid>
                            <Grid item>
                                <h2>FTD Beasty Book</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box p={2}>
                            <i title="Contribute and report issues on GitHub!">
                                <a href="https://github.com/gareththegeek/ftd-beasty-book">
                                    <img src="./github.png" alt="github repository" className={classes.icon} />
                                </a>
                            </i>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </header>)
}

export default Banner
