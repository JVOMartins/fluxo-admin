import useSettings, { SettingsProvider } from '@contexts/Settings'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@styles/theme'

const AppThemeProvider: React.FC = ({ children }) => {
  const { settings } = useSettings()

  return (
    <>
      <SettingsProvider settings={settings}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SettingsProvider>
    </>
  )
}

export default AppThemeProvider
