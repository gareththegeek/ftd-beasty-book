import { Box, Chip, IconButton, makeStyles } from '@material-ui/core'
import SaveAlt from '@material-ui/icons/SaveAlt'
import React, { FunctionComponent, ReactInstance, RefObject } from 'react'
import { useSelector } from 'react-redux'
import ShowMoreText from 'react-show-more-text'
import { selectMonsterViewModel } from '../../redux/monsters/selectors'
import Paragraph from './Paragraph'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { H2, H4 } from '../../components'

const useStyles = makeStyles(theme => ({
    primary: {
        color: theme.palette.primary.dark
    },
    chip: {
        margin: `-${theme.spacing(2)}px ${theme.spacing(0.5)}px ${theme.spacing(2)}px ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.secondary.light
    },
    less: {
        fontWeight: theme.typography.body1.fontWeight,
        fontSize: theme.typography.body1.fontSize,
        "& a": {
            color: theme.palette.primary.dark
        }
    }
}))

interface MonsterHeadingProps {
    exportRef: RefObject<ReactInstance>
}

const MonsterHeading: FunctionComponent<MonsterHeadingProps> = ({ exportRef }) => {
    const {
        primary,
        chip,
        less
    } = useStyles()
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
            <H2>{monster.name} <span className={primary} title={`${monster.hitPointsFormula} hp`}>HD {monster.hitDice}</span>
                <IconButton disabled={!monster} onClick={() => saveImage()} title="Export to image" href="#">
                    <SaveAlt></SaveAlt>
                </IconButton>
            </H2>
            {monster.tags.map(tag => (<Chip key={tag} size="small" className={chip} label={tag}></Chip>))}
            <H4>No. Appearing: {monster.numberAppearing}</H4>
            <div className={less}>
                <ShowMoreText
                    lines={1}
                    more="More">
                    <Paragraph text={monster.description} />
                </ShowMoreText>
            </div>
        </Box>
    )
}

export default MonsterHeading
