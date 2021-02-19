import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 240
  },
  desktopDrawer: {
    width: 240,
    height: '100%',
    borderRight: 'none',
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
  },
  scrollContent: {
    overflow: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '&::-webkit-scrollbar': {
      width: 3
    },
    /* Track */
    '&::-webkit-scrollbar-track': {
      background: '#eee'
    },
    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.primary.main
    }
  },
  footer: {
    backgroundColor: '#eee',
    color: '#222',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    alignContent: 'center',
    '& > small': {
      padding: theme.spacing(2)
    },
    '& > a': {
      width: 50,
      display: 'flex',
      alignContent: 'center'
    }
  }
}))

export default useStyles
