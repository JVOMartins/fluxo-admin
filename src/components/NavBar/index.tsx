import { useRouter } from 'next/router'
import { Drawer, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './styles'
import CompanyLogo from '@components/CompanyLogo'
import useSettings from '@contexts/Settings'

import Image from 'next/image'
import AppMenu from '@components/AppMenu'

const NavBar: React.FC = () => {
  const { settings, saveSettings } = useSettings()
  const year = new Date().getFullYear()
  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.desktopDrawer }}
      open={settings.openMenu}
      variant="persistent"
    >
      <button
        onClick={() => saveSettings({ openMenu: !settings.openMenu })}
        className={classes.closeDrawerMobile}
      >
        <CloseIcon />
      </button>
      <Box height="100%" display="flex" flexDirection="column">
        <CompanyLogo />
        <div className={classes.scrollContent}>
          <AppMenu />
          <div className={classes.footer}>
            <small>&copy; Fluxo - {year}</small>
            <a href="https://fluxo.live" target="_blank">
              <Image
                src="/logos/fluxo_icon.svg"
                alt="Fluxo"
                width={30}
                height={30}
                loading="eager"
              />
            </a>
          </div>
        </div>
      </Box>
    </Drawer>
  )
}

export default NavBar
