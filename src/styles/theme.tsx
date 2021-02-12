import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  palette: {
    primary: {
      main: '#4fd2c2'
    },
    secondary: {
      main: '#3398dc'
    },
    error: {
      main: '#f03434'
    },
    warning: {
      main: '#f9bf3b'
    },
    info: {
      main: '#e4f1fe'
    },
    background: {
      default: '#f7f7f7'
    }
  }
})

export default theme
