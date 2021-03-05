import { Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'

interface ParagraphProps {
    text: string
}

export const Paragraph: FunctionComponent<ParagraphProps> = ({ text }) => (
    <>
        {text.split('\n').map((paragraph, index) => (<Typography variant="body1" paragraph key={`para-${index}`}>{paragraph}</Typography>))}
    </>
)

export default Paragraph
