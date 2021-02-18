import { Button, TextField, Typography } from '@material-ui/core'
import Image from 'next/image'
import useStyles from './styles'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'

const Reset: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()

  return (
    <>
      <div className={classes.root}>
        <div className={classes.square}>
          <div className={classes.left}>
            <Image
              src="/images/login.webp"
              width={400}
              height={300}
              layout="responsive"
            />
          </div>
          <div className={classes.right}>
            <div>
              <Image src="/logos/fluxo_icon.svg" width={50} height={50} />
              <Typography variant="h6" component="h1">
                {text('resetTitle')}
              </Typography>
              <Typography variant="body2">{text('resetSubtitle')}</Typography>
            </div>

            <form autoComplete="off" className={classes.form}>
              <TextField
                id="email"
                label={text('resetInputEmail')}
                variant="outlined"
                className={classes.input}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <div className={classes.buttons}>
                <Button color="primary" variant="contained">
                  {text('resetButtonSend')}
                </Button>
              </div>
            </form>
            <div className={classes.options}>
              <Button
                variant="text"
                color="primary"
                onClick={() => router.push('/login')}
              >
                &larr; {text('resetButtonBack')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset
