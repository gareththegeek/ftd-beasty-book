import { Box } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { H3 } from '../../components'
import Paragraph from './Paragraph'

export interface ParagraphProps {
    text: string
    title: string
}

export const ParagraphBlock: FunctionComponent<ParagraphProps> = ({ text, title }) => (
    <Box m={2}>
        <H3>{title}</H3>
        <Paragraph text={text} />
    </Box>
)

export default ParagraphBlock
