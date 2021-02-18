import { Button, TextField, Typography } from '@material-ui/core'
import Image from 'next/image'
import useStyles from './styles'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'

const Register: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

  return (
    <>
      <div className={classes.root}>
        <div className={classes.square}>
          <div className={classes.left}></div>
          <div className={classes.right}>
            <div>
              <Image src="/logos/fluxo_icon.svg" width={50} height={50} />
              <Typography variant="h6" component="h1">
                {text('registerTitle')}
              </Typography>
              <Typography variant="body2">
                {text('registerSubtitle')}
              </Typography>
            </div>

            <form autoComplete="off" className={classes.form}>
              <div>
                <TextField
                  id="firstname"
                  label={text('registerInputFirstName')}
                  variant="outlined"
                  className={classes.input}
                  size="small"
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
                  className={classes.input}
                  size="small"
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
                  className={classes.input}
                  size="small"
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
                  className={classes.input}
                  size="small"
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
                  className={classes.input}
                  size="small"
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
                  className={classes.input}
                  size="small"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div className={classes.buttons}>
                <Button color="primary" variant="contained">
                  {text('registerButtonSend')}
                </Button>
              </div>
            </form>
            <div className={classes.options}>
              <Typography variant="body2">
                {text('registerTextRegister')}
              </Typography>
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
