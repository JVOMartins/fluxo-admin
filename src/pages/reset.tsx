import { Button, makeStyles, TextField } from '@material-ui/core'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import LayoutLogin from '@components/LayoutLogin'

const useStyles = makeStyles(theme => ({
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  },
  inputText: {
    margin: '10px 0',
    width: '100%'
  },
  buttonsActions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 100
    }
  },
  optionsFooter: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const Reset: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

  return (
    <>
      <LayoutLogin title="resetTitle" subtitle="resetSubtitle">
        <form autoComplete="off" className={classes.formContent}>
          <TextField
            id="email"
            label={text('resetInputEmail')}
            variant="outlined"
            className={classes.inputText}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <div className={classes.buttonsActions}>
            <Button color="primary" variant="contained">
              {text('resetButtonSend')}
            </Button>
          </div>
        </form>
        <div className={classes.optionsFooter}>
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push('/login')}
          >
            &larr; {text('resetButtonBack')}
          </Button>
        </div>
      </LayoutLogin>
    </>
  )
}

export default Reset
