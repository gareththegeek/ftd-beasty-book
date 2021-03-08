import { withStyles } from '@material-ui/core'
import { Link as VanillaLink } from '@material-ui/core'

const Link = withStyles((theme) => ({
    root: { 
        color: theme.palette.primary.dark,
        textDecoration: 'underline'
    }
}))(VanillaLink)

export default Link
