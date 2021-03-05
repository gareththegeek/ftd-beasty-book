import { Box, Chip, IconButton, makeStyles, Typography } from '@material-ui/core'
import SaveAlt from '@material-ui/icons/SaveAlt'
import React, { FunctionComponent, ReactInstance, RefObject } from 'react'
import { useSelector } from 'react-redux'
import ShowMoreText from 'react-show-more-text'
import { selectMonsterViewModel } from '../../redux/monsters/selectors'
import Paragraph from './Paragraph'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

const useStyles = makeStyles(theme => ({
    primary: {
        color: theme.palette.primary.dark
    },
    chip: {
        margin: `0 ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.info.light
    }
}))

interface MonsterHeadingProps {
    exportRef: RefObject<ReactInstance>
}

const MonsterHeading: FunctionComponent<MonsterHeadingProps> = ({ exportRef }) => {
    const classes = useStyles()
    const monster = useSelector(selectMonsterViewModel)

    if (!monster) {
        return <></>
    }

    const saveImage = async () => {
        if (!monster) {
            return
        }

        const blob = await domtoimage.toBlob(exportRef.current as Node)
        saveAs(blob, `${monster.id}.png`)
    }

    return (
        <Box m={2}>
            <Typography variant="h2">{monster.name} <span className={classes.primary} title={`${monster.hitPointsFormula} hp`}>HD {monster.hitDice}</span>
                <IconButton disabled={!monster} onClick={() => saveImage()} title="Export to image" href="#">
                    <SaveAlt></SaveAlt>
                </IconButton>
            </Typography>
            {monster.tags.map(tag => (<Chip key={tag} size="small" className={classes.chip} label={tag}></Chip>))}
            <Typography variant="h4">No. Appearing: {monster.numberAppearing}</Typography>
            <ShowMoreText
                lines={1}
                more="Show description">
                <Paragraph text={monster.description} />
            </ShowMoreText>
        </Box>
    )
}

export default MonsterHeading
