import { Typography } from '@material-ui/core'
import React from 'react'

const H2: React.FunctionComponent<any> = (props: any) => (
    <Typography {...props} variant="h2">{props.children}</Typography>
)

export default H2
