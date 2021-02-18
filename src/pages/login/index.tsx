import { Button, TextField, Typography } from '@material-ui/core'
import Image from 'next/image'
import useStyles from './styles'
import LockIcon from '@material-ui/icons/Lock'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'

const Login: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

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
                {text('loginTitle')}
              </Typography>
              <Typography variant="body2">{text('loginSubtitle')}</Typography>
            </div>

            <form autoComplete="off" className={classes.formContent}>
              <TextField
                id="email"
                label={text('loginInputEmail')}
                variant="outlined"
                className={classes.inputText}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
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
                <Button color="primary" variant="contained">
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
              <Typography variant="body2">
                {text('loginTextRegister')}
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => router.push('/register')}
              >
                {text('loginButtonRegister')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
