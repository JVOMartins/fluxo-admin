import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 240
  },
  desktopDrawer: {
    width: 240,
    height: '100%',
    borderRight: 'none',
    boxShadow: '-10px 0px 20px 0px #ccc',
    borderTop: `5px solid ${theme.palette.primary.main}`,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      boxShadow: '0px 0px 2000px 2000px rgba(0, 0, 0, 0.5)'
    }
  },
  closeDrawerMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
      display: 'flex',
      right: 0,
      padding: theme.spacing(2),
      position: 'absolute',
      border: 'none'
    },
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      outline: 'none'
    }
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  listItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3)
  },
  listItemText: {
    fontSize: 14
  }
}))

export default useStyles
