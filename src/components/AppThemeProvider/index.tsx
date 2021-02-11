import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@styles/theme'
//import { createTheme } from '@styles/theme'
//import useSettings from 'src/hooks/useSettings'

const AppThemeProvider: React.FC = ({ children }) => {
  //const { settings } = useSettings()
  //console.log(settings)
  //const theme = createTheme({ theme: settings.theme })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default AppThemeProvider
