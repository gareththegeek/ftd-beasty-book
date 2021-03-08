import { Typography } from '@material-ui/core'
import React from 'react'

const Body1: React.FunctionComponent<any> = (props: any) => (
    <Typography {...props} variant="body1" paragraph>{props.children}</Typography>
)

export default Body1
