import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import MoreVert from '@material-ui/icons/MoreVert'

import SearchBar from '@components/SearchBar'
import useStyles from './styles'
import useSettings from '@contexts/Settings'
import clsx from 'clsx'
import SelectLanguage from '@components/SelectLanguages'
import Image from 'next/image'

const TopBar: React.FC = () => {
  const classes = useStyles()
  const { settings, saveSettings } = useSettings()

  const handleOpenMenu = (): void => {
    saveSettings({ ...settings, openMenu: !settings.openMenu })
  }

  return (
    <AppBar className={classes.root} color="default" position="fixed">
      <Toolbar
        className={clsx(classes.toolbar, {
          [classes.toolbarWithoutDrawer]: !settings.openMenu
        })}
      >
        <Box display="flex" alignItems="center">
          <button
            onClick={() => handleOpenMenu()}
            className={classes.closeDrawer}
          >
            {!settings.openMenu && <MenuIcon className={classes.iconsMenu} />}
            {settings.openMenu && <CloseIcon className={classes.iconsMenu} />}
          </button>
          <Image
            src="/logos/fluxo_icon.svg"
            alt="Fluxo"
            width={30}
            height={30}
            loading="eager"
          />
        </Box>
        <Hidden mdDown>
          <SearchBar />
        </Hidden>
        <Box display="flex">
          <SelectLanguage />
          <IconButton className={classes.icons}>
            <MoreVert />
          </IconButton>
          <Avatar className={classes.avatar}>H</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
