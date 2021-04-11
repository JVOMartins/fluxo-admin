import { makeStyles } from '@material-ui/core'
import personalStyles from '@styles/styles'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    position: 'relative',
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
    position: 'relative',
    backgroundColor: '#fff',
    padding: personalStyles.metrics.padding,
    borderRadius: personalStyles.metrics.borderRadius,
    marginBottom: personalStyles.metrics.margin,
    minWidth: 200,
    width: '100%',
    border: '3px solid',
    borderColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      marginRigth: personalStyles.metrics.margin
    },
    cursor: 'pointer',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '45%',
      right: -40,
      width: 0,
      height: 0,
      transform: 'rotate(-90deg)',
      borderTop: ' solid 10px',
      borderTopColor: personalStyles.colors.primary,
      borderLeft: 'solid 35px transparent',
      borderRight: 'solid 35px transparent'
    }
  }
}))

export default useStyles
