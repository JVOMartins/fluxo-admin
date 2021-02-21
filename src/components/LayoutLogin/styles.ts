import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.primary.main
    }
  },
  container: {
    width: '50vw',
    height: '70vh',
    display: 'flex',
    borderRadius: 16,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      width: '97vw',
      height: '98vh',
      boxShadow: 'none'
    },
    boxShadow: '2px 5px 10px 1px #eee'
  },
  leftImage: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  rightForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      borderRadius: 16
    }
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}))

export default useStyles
