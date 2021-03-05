import { useTheme } from '@material-ui/core'
import { AppBar, Grid, makeStyles, Toolbar, useMediaQuery } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    },
    nav: {
        marginLeft: '24px'
    },
    navItem: {
        color: '#fff',
        textDecoration: 'none',
        padding: '12px 4px 8px 4px',
        cursor: 'pointer',
        fontSize: '16px',
        lineHeight: '32px',
        display: 'inline-block',
        textAlign: 'center',
        minWidth: '80px'
    },
    navItemActive: {
        color: '#fff',
        textDecoration: 'none',
        padding: '12px 4px 6px 4px',
        cursor: 'pointer',
        fontSize: '16px',
        lineHeight: '32px',
        borderBottom: '2px solid #fff',
        display: 'inline-block',
        textAlign: 'center',
        minWidth: '80px'
    }
}))

const Banner: React.FunctionComponent = () => {
    const classes = useStyles()
    const { pathname } = useLocation()
    const [path, setPath] = useState<string>()
    const theme = useTheme()
    const expandMenu = useMediaQuery(theme.breakpoints.up('sm'))

    useEffect(() => {
        setPath(pathname)
    }, [pathname, path])

    const active = (path === '/about' ? 'about' : 'monsters')
    const showAbout = expandMenu || (active !== 'about')
    const showMonsters = expandMenu || (active !== 'monsters')

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
                        <nav className={classes.nav}>
                            <Grid container direction="row" alignItems="center" spacing={2}>
                                <Grid item>
                                    {showMonsters &&
                                        <NavLink
                                            to="/"
                                            className={active === 'monsters' ? classes.navItemActive : classes.navItem}
                                            title="Show me the monsters!">
                                            Monsters
                                    </NavLink>}
                                </Grid>
                                <Grid item>
                                    {showAbout &&
                                        <NavLink
                                            to="/about"
                                            className={active === 'about' ? classes.navItemActive : classes.navItem}
                                            title="What is Five Monsters Deep?">
                                            About
                                    </NavLink>}
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
