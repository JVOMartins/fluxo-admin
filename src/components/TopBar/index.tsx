import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

import Apps from '@material-ui/icons/Apps'
import MoreVert from '@material-ui/icons/MoreVert'
import VideoCall from '@material-ui/icons/VideoCall'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import SearchBar from '@components/SearchBar'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff'
  },
  toolbar: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    cursor: 'pointer',
    height: 25,
    marginLeft: theme.spacing(3)
  },
  icons: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}))

const TopBar: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <MenuIcon />
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
          <IconButton className={classes.icons}>
            <Brightness4Icon />
          </IconButton>
          <IconButton className={classes.icons}>
            <VideoCall />
          </IconButton>
          <IconButton className={classes.icons}>
            <Apps />
          </IconButton>
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
