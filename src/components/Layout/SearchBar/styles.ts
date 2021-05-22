import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700
  },
  input: {
    flex: 1
  }
}))

export default useStyles
