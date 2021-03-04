import { Box, Chip, IconButton, makeStyles } from '@material-ui/core'
import SaveAlt from '@material-ui/icons/SaveAlt'
import React, { FunctionComponent, ReactInstance, RefObject } from 'react'
import { useSelector } from 'react-redux'
import ShowMoreText from 'react-show-more-text'
import { selectMonsterViewModel } from '../../redux/monsters/selectors'
import Paragraph from './Paragraph'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

const useStyles = makeStyles(theme => ({
    light: {
        color: theme.palette.info.main
    },
    chip: {
        margin: '0 4px',
        backgroundColor: theme.palette.info.light
    },
    textLight: {
        fontWeight: 400
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
            <h2>{monster.name} <span className={classes.light} title={`${monster.hitPointsFormula} hp`}>HD {monster.hitDice}</span>
                <IconButton disabled={!monster} onClick={() => saveImage()} title="Export to image" href="#">
                    <SaveAlt></SaveAlt>
                </IconButton>
            </h2>
            {monster.tags.map(tag => (<Chip size="small" className={classes.chip} label={tag}></Chip>))}
            <h4 className={classes.textLight}>No. Appearing: {monster.numberAppearing}</h4>
            <ShowMoreText
                lines={1}
                more="Show description">
                <Paragraph text={monster.description} />
            </ShowMoreText>
        </Box>
    )
}

export default MonsterHeading
