import { Typography } from '@material-ui/core'
import React from 'react'

const H4: React.FunctionComponent<any> = (props: any) => (
    <Typography {...props} variant="h4" paragraph>{props.children}</Typography>
)

export default H4
