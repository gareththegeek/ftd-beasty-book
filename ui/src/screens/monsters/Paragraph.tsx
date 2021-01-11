import React, { FunctionComponent } from 'react'

interface ParagraphProps {
    text: string
}

export const Paragraph: FunctionComponent<ParagraphProps> = ({ text }) => (
    <>
        {text.split('\n').map((paragraph, index) => (<p key={`para-${index}`}>{paragraph}</p>))}
    </>
)

export default Paragraph
