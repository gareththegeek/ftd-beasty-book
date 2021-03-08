import { Typography } from '@material-ui/core'
import React from 'react'

const H1: React.FunctionComponent<any> = (props: any) => (
    <Typography {...props} variant="h1" paragraph>{props.children}</Typography>
)

export default H1
