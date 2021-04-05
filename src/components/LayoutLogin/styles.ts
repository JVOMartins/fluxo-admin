import { makeStyles } from '@material-ui/core'

const imgsLeft = [
  'login_img_1.png',
  'login_img_2.png',
  'login_img_3.png',
  'login_img_4.png',
  'login_img_5.png'
]

const random = Math.floor(Math.random() * imgsLeft.length)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(217deg, #00ab6480 0%, #3398dc80 100%)'
  },
  container: {
    width: '50vw',
    height: '68vh',
    display: 'flex',
    borderRadius: 16,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      width: '95vw',
      height: '90vh',
      boxShadow: 'none'
    },
    boxShadow: '0px 10px 15px #0000001A'
  },
  leftImage: {
    width: '65%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundImage: `url(/images/${imgsLeft[random]})`,
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  rightForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: '50px',
    borderRadius: 16,
    [theme.breakpoints.down('sm')]: {
      padding: '20px'
    }
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}))

export default useStyles
