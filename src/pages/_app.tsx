import React from 'react'
import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppThemeProvider from '@components/AppThemeProvider'

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
        <Component {...pageProps} />
      </AppThemeProvider>
    </>
  )
}

export default MyApp
