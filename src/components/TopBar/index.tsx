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

import Apps from '@material-ui/icons/Apps'
import MoreVert from '@material-ui/icons/MoreVert'
import VideoCall from '@material-ui/icons/VideoCall'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import SearchBar from '@components/SearchBar'
import useStyles from './styles'
import useSettings from '@contexts/Settings'
import clsx from 'clsx'

const TopBar: React.FC = () => {
  const classes = useStyles()
  const { settings, saveSettings } = useSettings()

  return (
    <AppBar className={classes.root} color="default" position="fixed">
      <Toolbar
        className={clsx(classes.toolbar, {
          [classes.toolbarWithoutDrawer]: !settings.openMenu
        })}
      >
        <Box display="flex" alignItems="center">
          <button
            onClick={() => saveSettings({ openMenu: !settings.openMenu })}
            className={classes.closeDrawer}
          >
            {!settings.openMenu && <MenuIcon />}
            {settings.openMenu && <CloseIcon />}
          </button>
          <img
            src="https://cdn.bitrix24.com.br/b16736413/landing/b45/b454759231a32acba2cc9ef79d88d0f7/logo_fluxo.001_1x.png"
            alt="logo"
            className={classes.logo}
          />
        </Box>
        <Hidden mdDown>
          <SearchBar />
        </Hidden>
        <Box display="flex">
          <Hidden mdDown>
            <IconButton className={classes.icons}>
              <Brightness4Icon />
            </IconButton>
            <IconButton className={classes.icons}>
              <VideoCall />
            </IconButton>
            <IconButton className={classes.icons}>
              <Apps />
            </IconButton>
          </Hidden>
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
