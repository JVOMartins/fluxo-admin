import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 48,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 24
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}))

export default useStyles
