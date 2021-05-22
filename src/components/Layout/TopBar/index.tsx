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
import useAuth from '@contexts/auth'
import SearchBar from '@components/Layout/SearchBar'
import useStyles from './styles'
import useSettings from '@contexts/Settings'
import clsx from 'clsx'
import SelectLanguage from '@components/Layout/SelectLanguages'
import Image from 'next/image'
import { useRouter } from 'next/router'

const TopBar: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { settings, saveSettings } = useSettings()
  const { user, signOut } = useAuth()

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
            className={classes.imageGrayscale}
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
          {!user?.avatar ? (
            <Avatar
              className={classes.avatar}
              onClick={() => {
                signOut()
                router.push('/login')
              }}
            >
              {user?.first_name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className={classes.avatar}
              src={user.avatar}
              alt={user.first_name}
              onClick={() => {
                signOut()
                router.push('/login')
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
