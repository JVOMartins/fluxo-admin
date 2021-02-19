import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  container: {
    width: '50vw',
    height: '70vh',
    display: 'flex',
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
      height: '90vh'
    },
    boxShadow: '2px 5px 10px 1px #eee'
  },
  leftImage: {
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  rightForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    padding: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
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
