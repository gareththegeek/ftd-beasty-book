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
        padding: '12px 4px 6px 4px',
        borderBottom: '2px solid #fff'
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
