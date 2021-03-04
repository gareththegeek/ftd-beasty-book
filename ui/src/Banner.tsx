import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    },
    navItem: {
        color: '#fff',
        textDecoration: 'none',
        padding: '16px',
        cursor: 'pointer',
        fontSize: '16px',
        lineHeight: '32px',
    },
    navItemActive: {
        color: '#fff',
        textDecoration: 'none',
        padding: '16px',
        cursor: 'pointer',
        fontSize: '16px',
        lineHeight: '32px',
        borderBottom: '2px solid #fff'
    }
}))

const Banner: React.FunctionComponent = () => {
    const classes = useStyles()
    const { pathname } = useLocation()
    const [path, setPath] = useState<string>()

    useEffect(() => {
        setPath(pathname)
    }, [pathname, path])

    return (<header>
        <AppBar position="static">
            <Toolbar>
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <i>
                            <img src="./android-chrome-192x192.png" alt="Five Monsters Deep" className={classes.icon} />
                        </i>
                    </Grid>
                    <Grid item>
                        <h2>Five Monsters Deep</h2>
                    </Grid>
                    <Grid item>
                        <nav>
                            <Grid container direction="row" alignItems="center" spacing={2}>
                                <Grid item>
                                    <NavLink
                                        to="/about"
                                        className={path === '/about' ? classes.navItemActive : classes.navItem}
                                        title="What is Five Monsters Deep?">
                                        About
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to="/"
                                        className={path !== '/about' ? classes.navItemActive : classes.navItem}
                                        title="Show me the monsters!">
                                        Monsters
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </nav>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </header>)
}

export default Banner
