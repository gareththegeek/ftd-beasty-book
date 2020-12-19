import { AppBar, Toolbar } from '@material-ui/core'
import React from 'react'

const Banner: React.FunctionComponent = () => {
    return (<header>
        <AppBar position="static">
            <Toolbar>
                <h2>Five Torches Deep Monsters</h2>
            </Toolbar>
        </AppBar>
    </header>)
}

export default Banner
