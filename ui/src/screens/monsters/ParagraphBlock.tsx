import { Box } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import Paragraph from './Paragraph'

export interface ParagraphProps {
    text: string
    title: string
}

export const ParagraphBlock: FunctionComponent<ParagraphProps> = ({ text, title }) => (
    <Box m={2}>
        <h3>{title}</h3>
        <Paragraph text={text} />
    </Box>
)

export default ParagraphBlock
