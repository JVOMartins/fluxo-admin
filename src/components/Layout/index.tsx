import Head from 'next/head'
import useStyles from './styles'
import TopBar from '@components/TopBar'
import NavBar from '@components/NavBar'
import clsx from 'clsx'
import useSettings from '@contexts/Settings'
import { memo, ReactNode } from 'react'
import useTranslation from '@contexts/Intl'
import { TitlePage } from './titlePage'
import { Box } from '@material-ui/core'

interface LayoutProps {
  children: ReactNode
  title?: string
  icon?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  icon
}: LayoutProps) => {
  const classes = useStyles()
  const { settings } = useSettings()
  const { text } = useTranslation()

  return (
    <>
      <Head>
        <title>Fluxo | {text(title)}</title>
      </Head>
      <Box className={classes.root}>
        <NavBar />
        <Box
          className={clsx({
            [classes.wrapper]: settings.openMenu,
            [classes.wrapperWithoutDrawer]: !settings.openMenu
          })}
        >
          <TopBar />
          <Box className={classes.contentContainer}>
            <Box className={classes.content}>
              <TitlePage title={title} icon={icon}></TitlePage>
              <Box className={classes.children}>{children}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(Layout)
