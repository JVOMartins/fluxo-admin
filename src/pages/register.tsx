import {
  Button,
  FormControlLabel,
  makeStyles,
  Switch,
  TextField
} from '@material-ui/core'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LayoutLogin from '@components/LayoutLogin'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  container: {
    width: '50vw',
    height: '70vh',
    display: 'flex',
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    },
    boxShadow: '2px 5px 10px 1px #eee'
  },
  leftImage: {
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  rightForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    padding: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1),

    '& > div': {
      display: 'flex',
      '& .MuiTextField-root': {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
      }
    }
  },
  inputText: {
    width: '100%'
  },
  buttonsActions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
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
  },
  labelSwitch: {
    marginBottom: 10,
    '& > .MuiFormControlLabel-label': {
      fontSize: 12
    }
  }
}))

const Register: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
  const [acceptNews, setAcceptNews] = useState<boolean>(true)

  return (
    <>
      <LayoutLogin title="registerTitle" subtitle="registerSubtitle">
        <form autoComplete="off" className={classes.formContent}>
          <div>
            <TextField
              id="firstname"
              label={text('registerInputFirstName')}
              variant="outlined"
              className={classes.inputText}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="lastname"
              label={text('registerInputLastName')}
              variant="outlined"
              className={classes.inputText}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <TextField
              id="phone"
              label={text('registerInputPhone')}
              variant="outlined"
              className={classes.inputText}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="email"
              label={text('registerInputEmail')}
              variant="outlined"
              type="email"
              className={classes.inputText}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <TextField
              id="password"
              label={text('registerInputPassword')}
              variant="outlined"
              type="password"
              className={classes.inputText}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="confirmPassword"
              label={text('registerInputConfirmPassword')}
              variant="outlined"
              type="password"
              className={classes.inputText}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <FormControlLabel
              className={classes.labelSwitch}
              control={
                <Switch
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  name="terms"
                  color="primary"
                  size="small"
                />
              }
              label="Li e concordo os Termos de uso e Política de privacidade"
            />
          </div>
          <div>
            <FormControlLabel
              className={classes.labelSwitch}
              control={
                <Switch
                  checked={acceptNews}
                  onChange={() => setAcceptNews(!acceptNews)}
                  name="news"
                  color="primary"
                  size="small"
                />
              }
              label="Aceito receber notificações e promoções exclusivas dos parceiros Fluxo via celular ou e-mail"
            />
          </div>
          <div className={classes.buttonsActions}>
            <Button color="primary" variant="contained" disabled={!acceptTerms}>
              {text('registerButtonSend')}
            </Button>
          </div>
        </form>
        <div className={classes.optionsFooter}>
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push('/login')}
          >
            &larr; {text('registerButtonBack')}
          </Button>
        </div>
      </LayoutLogin>
    </>
  )
}

export default Register
