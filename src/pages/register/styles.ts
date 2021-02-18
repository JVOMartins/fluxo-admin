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
    height: '70vh',
    display: 'flex',
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    },
    boxShadow: '2px 5px 10px 1px #eee'
  },
  left: {
    width: '60%',
    backgroundImage: 'url("/images/login.webp")',
    backgroundPosition: 'center center',
    backgroundSize: '500px',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius
  },
  right: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    padding: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1),

    '& > div': {
      display: 'flex',
      '& .MuiTextField-root': {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
      }
    }
  },
  input: {
    width: '100%'
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
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
