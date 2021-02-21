import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import LayoutLogin from '@components/LayoutLogin'
import { useCallback, useState } from 'react'
import validateMail from '@utils/validateMail'

const Login: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

  const [mail, setMail] = useState<string>('')
  const [validMail, setValidMail] = useState<boolean>(true)

  const handleChangeMail = useCallback(
    (value: string): void => {
      const isValidMail = validateMail(value)
      setValidMail(isValidMail)
    },
    [validMail]
  )

  return (
    <>
      <LayoutLogin title="loginTitle" subtitle="loginSubtitle">
        <form autoComplete="off" className={classes.formContent}>
          <TextField
            error={mail && !validMail}
            helperText={mail && !validMail ? 'E-mail Inválido' : null}
            id="email"
            label={text('loginInputEmail')}
            variant="outlined"
            className={classes.inputText}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            value={mail}
            onChange={event => setMail(event.target.value)}
            onBlur={() => handleChangeMail(mail)}
          />
          <TextField
            id="password"
            label={text('loginInputPassword')}
            variant="outlined"
            type="password"
            className={classes.inputText}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <div className={classes.buttonsActions}>
            <Button
              color="primary"
              variant="contained"
              disabled={!mail || !validMail}
            >
              {text('loginButtonSend')}
            </Button>
            <Button
              variant="text"
              size="small"
              startIcon={<LockIcon />}
              onClick={() => router.push('/reset')}
            >
              {text('loginButtonResetPassword')}
            </Button>
          </div>
        </form>
        <div className={classes.optionsFooter}>
          <Typography variant="body2">{text('loginTextRegister')}</Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push('/register')}
          >
            {text('loginButtonRegister')}
          </Button>
        </div>
      </LayoutLogin>
    </>
  )
}

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

export default Login
