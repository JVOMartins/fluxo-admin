import Head from 'next/head'
import useStyles from './styles'
import TopBar from '@components/TopBar'
import NavBar from '@components/NavBar'
import clsx from 'clsx'
import useSettings from '@contexts/Settings'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps) => {
  const classes = useStyles()
  const { settings } = useSettings()

  return (
    <>
      <Head>
        <title>Fluxo | {title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.root}>
        <NavBar />
        <div
          className={clsx({
            [classes.wrapper]: settings.openMenu,
            [classes.wrapperWithoutDrawer]: !settings.openMenu
          })}
        >
          <TopBar />
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
