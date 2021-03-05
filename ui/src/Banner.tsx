import { useTheme } from '@material-ui/core'
import { AppBar, Grid, makeStyles, Toolbar, useMediaQuery } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { selectMonsterViewModel } from './redux/monsters/selectors'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    },
    nav: {
        marginLeft: theme.spacing(3)
    },
    navItem: {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        padding: `${theme.spacing(1.5)}px ${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
        cursor: 'pointer',
        fontSize: theme.spacing(2),
        display: 'inline-block',
        textAlign: 'center',
        minWidth: theme.spacing(9),
    },
    navItemActive: {
        paddingBottom: theme.spacing(0.75),
        borderBottom: `2px solid ${theme.palette.primary.contrastText}`
    }
}))

const Banner: React.FunctionComponent = () => {
    const classes = useStyles()
    const { pathname } = useLocation()
    const [path, setPath] = useState<string>()
    const theme = useTheme()
    const expandMenu = useMediaQuery(theme.breakpoints.up('sm'))
    const monster = useSelector(selectMonsterViewModel)

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
                                            to={`/${monster !== undefined ? monster.id : ''}`}
                                            className={`${classes.navItem} ${active === 'monsters' && classes.navItemActive}`}
                                            title="Show me the monsters!">
                                            Monsters
                                    </NavLink>}
                                </Grid>
                                <Grid item>
                                    {showAbout &&
                                        <NavLink
                                            to="/about"
                                            className={`${classes.navItem} ${active === 'about' && classes.navItemActive}`}
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
