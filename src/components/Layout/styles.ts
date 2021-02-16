import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    '& > *': {
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut
      })
    }
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    position: 'fixed',
    paddingTop: 100,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 340
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20
    }
  },
  wrapperWithoutDrawer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 40,
      paddingTop: 100
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      paddingTop: 60
    },
    position: 'fixed'
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
