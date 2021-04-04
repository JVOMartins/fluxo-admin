import classes from './LoadingDiv.module.css'
import { Box } from '@material-ui/core'

const LoadingDiv: React.FC = () => (
  <Box className={classes.loading}>
    <img
      className={classes.loadingImage}
      src="./loading.svg"
      alt="Loading..."
    />
  </Box>
)

export { LoadingDiv }
