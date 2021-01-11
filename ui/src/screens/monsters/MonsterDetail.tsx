import { CircularProgress, Container, Grid, makeStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import React, { ReactInstance, RefObject, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectMonsterLoading, selectMonsterViewModel } from '../../redux/monsters/selectors'
import MonsterStats from './MonsterStats'
import MonsterModifiers from './MonsterModifiers'
import ParagraphBlock from './ParagraphBlock'
import MonsterHeading from './MonsterHeading'

const useStyles = makeStyles(() => ({
    spinner: {
        width: '100%',
        textAlign: 'center'
    }
}))

const MonsterDetail: React.FunctionComponent = () => {

    const classes = useStyles()
    const loading = useSelector(selectMonsterLoading)
    const monster = useSelector(selectMonsterViewModel)
    const componentRef = useRef<typeof Grid>() as unknown as RefObject<ReactInstance>

    if (loading) {
        return (<Container className={classes.spinner}>
            <CircularProgress />
        </Container>)
    }

    if (!monster) {
        return (<div />)
    }

    return (
        <Grid container component={Paper} ref={componentRef}>
            <Grid item xs={12} md={6}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <MonsterHeading exportRef={componentRef} />
                    </Grid>
                    <Grid item xs={12}>
                        <MonsterStats />
                        <MonsterModifiers />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                        <ParagraphBlock title="Strong" text={monster.strong} />
                    </Grid>
                    <Grid item xs={6}>
                        <ParagraphBlock title="Weak" text={monster.weak} />
                    </Grid>
                    {monster.techniques.map((technique, index) => (
                        <Grid item key={index.toString()} xs={12} sm={6} md={12}>
                            <ParagraphBlock title="Technique" text={technique} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MonsterDetail
