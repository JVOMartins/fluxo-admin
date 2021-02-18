import React from 'react'
import Document, { Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import Head from 'next/head'
import theme from '@styles/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-Br">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  }
}
