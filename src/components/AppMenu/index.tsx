import { useState } from 'react'
import useStyles from './styles'
import { useRouter } from 'next/router'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import SettingsIcon from '@material-ui/icons/Settings'

const AppMenu: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const handleOpenMenu = (key: string): void => {
    setOpen(!open)
  }

  const isSelected = item => router.pathname === item.path

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      <ListItem
        button
        className={classes.menuItem}
        onClick={() => {
          setOpen(!open)
          router.push('/reset')
        }}
      >
        <ListItemIcon className={classes.menuItemIcon}>
          <IconDashboard />
        </ListItemIcon>
        <ListItemText
          primary="Engajamento"
          className={classes.menuItemText}
          disableTypography
        />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={classes.appSubMenu}
      >
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItemSubGroup}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary="Benchmark"
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>

          <ListItem button className={classes.menuItemSubGroup}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary="Relatórios"
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconShoppingCart />
        </ListItemIcon>
        <ListItemText
          primary="Feedbacks"
          className={classes.menuItemText}
          disableTypography
        />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconPeople />
        </ListItemIcon>
        <ListItemText
          primary="Enquetes"
          className={classes.menuItemText}
          disableTypography
        />
      </ListItem>

      <ListItem
        button
        onClick={() => setOpen2(!open2)}
        className={classes.menuItem}
      >
        <ListItemIcon className={classes.menuItemIcon}>
          <IconLibraryBooks />
        </ListItemIcon>
        <ListItemText
          primary="Gestor"
          className={classes.menuItemText}
          disableTypography
        />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>

      <Collapse
        in={open2}
        timeout="auto"
        unmountOnExit
        className={classes.appSubMenu}
      >
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItemSubGroup}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary="Usuários"
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
          <ListItem button className={classes.menuItemSubGroup}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary="Grupos"
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
          <ListItem button className={classes.menuItemSubGroup}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary="Metas"
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItem>
    </List>
  )
}

export default AppMenu
