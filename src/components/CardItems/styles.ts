import { makeStyles } from '@material-ui/core'
import personalStyles from '@styles/styles'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    padding: personalStyles.metrics.padding,
    borderRadius: personalStyles.metrics.borderRadius,
    marginBottom: personalStyles.metrics.margin,
    minWidth: 200,
    border: '3px solid transparent',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      marginRigth: personalStyles.metrics.margin
    },
    cursor: 'pointer'
  },
  cardActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    padding: personalStyles.metrics.padding,
    borderRadius: personalStyles.metrics.borderRadius,
    marginBottom: personalStyles.metrics.margin,
    minWidth: 200,
    border: '3px solid',
    borderColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      marginRigth: personalStyles.metrics.margin
    },
    cursor: 'pointer'
  }
}))

export default useStyles
