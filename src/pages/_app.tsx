import React from 'react'
import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppThemeProvider from '@components/AppThemeProvider'
import NextNprogress from 'nextjs-progressbar'
import theme from '@styles/theme'

const MyApp: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <AppThemeProvider>
        <CssBaseline />
        <NextNprogress
          color={theme.palette.primary.main}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <Component {...pageProps} />
      </AppThemeProvider>
    </>
  )
}

export default MyApp
