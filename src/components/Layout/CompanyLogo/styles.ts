import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    padding: 40,
    backgroundColor: '#fff',
    '& > img': {
      maxWidth: ' 100%',
      height: 'auto'
    }
  }
}))

export default useStyles
