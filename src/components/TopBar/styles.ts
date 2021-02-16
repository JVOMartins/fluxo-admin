import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.background.paper
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 230
    }
  },
  toolbarWithoutDrawer: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 0
  },
  closeDrawer: {
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
    border: 'none',
    cursor: 'pointer',

    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      outline: 'none'
    }
  },
  logo: {
    cursor: 'pointer',
    height: 25,
    marginLeft: theme.spacing(3)
  },
  icons: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  iconsMenu: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}))

export default useStyles
