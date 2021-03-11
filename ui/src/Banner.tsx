import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { selectMonsterViewModel } from './redux/monsters/selectors'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(theme => ({
    icon: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    },
    navItem: {
        display: 'flex',
        alignContent: 'center',
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        padding: theme.spacing(0.5),
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: theme.spacing(2),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    },
    navItemActive: {
        color: theme.palette.primary.contrastText,
        paddingBottom: theme.spacing(0.25),
        borderBottom: `2px solid ${theme.palette.primary.contrastText}`
    },
    linkText: {
        paddingTop: theme.spacing(0.5),
        display: 'inline',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    h1: {
        fontSize: theme.spacing(2.6)
    }
}))

const Banner: React.FunctionComponent = () => {
    const {
        h1,
        icon,
        navItem,
        navItemActive,
        linkText
    } = useStyles()
    const { pathname } = useLocation()
    const [path, setPath] = useState<string>()
    const monster = useSelector(selectMonsterViewModel)

    useEffect(() => {
        setPath(pathname)
    }, [pathname, path])

    const active = (path === '/about' ? 'about' : 'monsters')

    return (<header>
        <AppBar position="static">
            <Toolbar>
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <i>
                            <img src="./android-chrome-192x192.png" alt="Five Monsters Deep" className={icon} />
                        </i>
                    </Grid>
                    <Grid item>
                        <h1 className={h1}>Five Monsters Deep</h1>
                    </Grid>
                    <Grid item>
                        <nav>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <NavLink
                                        to={`/${monster !== undefined ? monster.id : ''}`}
                                        className={`${navItem} ${active === 'monsters' && navItemActive}`}
                                        title="Show me the monsters!">
                                        <WhatshotIcon />
                                        {<span className={linkText}>Monsters</span>}
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to="/about"
                                        className={`${navItem} ${active === 'about' && navItemActive}`}
                                        title="What is Five Monsters Deep?">
                                        <InfoIcon />
                                        {<span className={linkText}>About</span>}
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
