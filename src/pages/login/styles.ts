import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  square: {
    width: '50vw',
    height: '50vh',
    display: 'flex',
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
      height: '90vh'
    },
    boxShadow: '2px 5px 10px 1px #eee'
  },
  left: {
    width: '60%',
    backgroundImage:
      'url(https://images.pexels.com/photos/4524057/pexels-photo-4524057.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
    backgroundSize: 'cover',
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  right: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    }
  },
  input: {
    margin: '10px 0',
    width: '100%'
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 100
    }
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

export default useStyles
