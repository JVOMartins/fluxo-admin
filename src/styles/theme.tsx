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
      default: '#f5f5f5',
      paper: '#fff'
    }
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // mais básico recomendado periodicidade
      standard: 300,
      // isto é para ser utilizado em animações complexas
      complex: 375,
      // recomendado quando algo esta entrando na tela
      enteringScreen: 225,
      // recomendado quando algo esta deixando a tela
      leavingScreen: 195
    },
    easing: {
      // Esta é a curva de atenuação mais comum.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objetos que entram na tela na velocidade total e
      // lentamente desaceleram até um ponto de repouso.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objetos deixam a tela em velocidade máxima. Não desaceleram quando estão fora da tela.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // A atenuação de curva sharp é usada por objetos que podem retornar a tela a qualquer momento.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  }
})

export default theme
