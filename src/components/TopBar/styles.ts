import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff'
  },
  toolbar: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}))

export default useStyles
