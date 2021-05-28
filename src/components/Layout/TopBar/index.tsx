import {
  AppBar,
  Avatar,
  Box,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  ClickAwayListener
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
import { AddButton } from '@components/Buttons'
import React from 'react';
import { Style } from '@material-ui/icons'
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';




const TopBar: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { settings, saveSettings } = useSettings()
  const { user, signOut } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (): void => {
    saveSettings({ ...settings, openMenu: !settings.openMenu })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //menugrow
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }
      setAnchorEl(null);
      setOpen(false);
    };
  
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
  
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

      <div className={classes.root}>
        <div>
          
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {!user?.avatar ? (
            <Avatar
              className={classes.avatar}
            >
              {user?.first_name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className={classes.avatar}
              src={user.avatar}
              alt={user.first_name}
            />
          )}
            
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>Perfil</MenuItem>
                      <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                      <MenuItem onClick={() =>{
                        signOut()
                        router.push('/login')
                      }}>Sair</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
        </Box>
      </Toolbar>
    </AppBar>
  )
}


export default TopBar

