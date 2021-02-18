import {
  Button,
  FormControlLabel,
  makeStyles,
  Switch,
  TextField,
  Typography
} from '@material-ui/core'
import Image from 'next/image'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
  }
}))

const Register: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

  const [stateSwitch, setStateSwitch] = useState<boolean>(true)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateSwitch(!stateSwitch)
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.leftImage}>
            <Image
              src="/images/login.webp"
              width={400}
              height={300}
              layout="responsive"
            />
          </div>
          <div className={classes.rightForm}>
            <div>
              <Image src="/logos/fluxo_icon.svg" width={50} height={50} />
              <Typography variant="h6" component="h1">
                {text('registerTitle')}
              </Typography>
              <Typography variant="body2">
                {text('registerSubtitle')}
              </Typography>
            </div>

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
                  control={
                    <Switch
                      checked={stateSwitch}
                      onChange={handleChange}
                      name="terms"
                      size="small"
                    />
                  }
                  label="Li e concordo os Termos de uso e Política de privacidade"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={stateSwitch}
                      onChange={handleChange}
                      name="news"
                      size="small"
                    />
                  }
                  label="Aceito receber notificações e promoções exclusivas dos parceiros Fluxo via celular ou e-mail"
                />
              </div>
              <div className={classes.buttonsActions}>
                <Button color="primary" variant="contained">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
