import Head from 'next/head'
import useStyles from './styles'
import TopBar from '@components/TopBar'
import NavBar from '@components/NavBar'

interface LayoutProps {
  children: JSX.Element
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.root}>
        <TopBar />
        <NavBar />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
