import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@styles/global'
import { theme } from '@styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fluxo Admin</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
