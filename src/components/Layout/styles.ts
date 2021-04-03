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
    overflow: 'auto',
    position: 'fixed',
    width: '100%',
    height: '100%',
    marginTop: 50,

    [theme.breakpoints.up('md')]: {
      paddingLeft: 340,
      paddingRight: 90
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 80,
      paddingTop: 60
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: '#eee'
    },

    '&::-webkit-scrollbar': {
      width: 3,
      backgroundColor: '#eee'
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`
    }
  },
  wrapperWithoutDrawer: {
    display: 'flex',
    overflow: 'auto',
    position: 'fixed',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 90,
      paddingRight: 90,
      paddingTop: 50
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 60
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: '#eee'
    },

    '&::-webkit-scrollbar': {
      width: 3,
      backgroundColor: '#eee'
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`
    }
  },
  contentContainer: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    marginBottom: 30
  },
  content: {
    flex: '1 1 auto',
    paddingTop: 30,
    height: '100%'
  },
  children: {
    marginTop: 48,
    [theme.breakpoints.down('sm')]: {
      marginTop: 24
    }
  },
  titlePage: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    margin: 0,
    padding: 0,
    paddingBottom: 10,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em'
    }
  },
  breadcrumb: {
    margin: 0,
    padding: 0,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em'
    }
  },
  icon: {
    marginTop: 2,
    marginRight: 20,
    [theme.breakpoints.down('sm')]: {
      marginRight: 10
    }
  }
}))

export default useStyles
