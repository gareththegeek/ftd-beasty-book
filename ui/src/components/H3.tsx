import { Typography } from '@material-ui/core'
import React from 'react'

const H3: React.FunctionComponent<any> = (props: any) => (
    <Typography {...props} variant="h3" paragraph>{props.children}</Typography>
)

export default H3
