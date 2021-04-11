import classes from './LoadingDiv.module.css'
import { Box } from '@material-ui/core'

const LoadingDiv: React.FC = () => (
  <Box className={classes.loading}>
    <span className={classes.loader}>
      <span className={classes.loaderInner}></span>
    </span>
  </Box>
)

export { LoadingDiv }
