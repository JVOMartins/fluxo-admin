import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import Image from 'next/image'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
      width: '90vw',
      height: '90vh'
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
      <Head>
        <title>Fluxo | Recuperar Senha</title>
      </Head>
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
            <Image src="/logos/fluxo_icon.svg" width={50} height={50} />
            <Typography variant="h6" component="h1">
              {text('resetTitle')}
            </Typography>
            <Typography variant="body2">{text('resetSubtitle')}</Typography>

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
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset
