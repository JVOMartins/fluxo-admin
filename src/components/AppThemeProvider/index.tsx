import { AuthProvider } from '@contexts/auth'
import { LanguageProvider } from '@contexts/Intl'
import useSettings, { SettingsProvider } from '@contexts/Settings'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@styles/theme'

const AppThemeProvider: React.FC = ({ children }) => {
  const { settings } = useSettings()

  return (
    <>
      <AuthProvider>
        <LanguageProvider>
          <SettingsProvider settings={settings}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </SettingsProvider>
        </LanguageProvider>
      </AuthProvider>
    </>
  )
}

export default AppThemeProvider
