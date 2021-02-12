import { useRouter } from 'next/router'
import {
  Hidden,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Subscriptions from '@material-ui/icons/Subscriptions'
import Whatshot from '@material-ui/icons/Whatshot'

import VideoLibrary from '@material-ui/icons/VideoLibrary'
import useStyles from './styles'

const primaryMenu = [
  { id: 1, label: 'Engajamento', path: '/', icon: HomeIcon },
  { id: 2, label: 'Feedbacks', path: '/feedbacks', icon: Whatshot },
  { id: 3, label: 'Enquetes', path: '/enquetes', icon: Subscriptions },
  { id: 4, label: 'Gestor', path: 'gestor', icon: Subscriptions },
  { id: 5, label: 'Configurações', path: '/config', icon: Subscriptions }
]

const engagementSubMenu = [
  { id: 1, label: 'Benchmark', path: '/benchmark', icon: VideoLibrary },
  { id: 2, label: 'Relatórios', path: '/relatorios', icon: VideoLibrary }
]

const NavBar: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()

  const isSelected = item => router.pathname === item.path

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <div>Teste</div>
      <Divider />
      <List>
        {primaryMenu.map(item => {
          const Icon = item.icon
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText
                }}
                primary={item.label}
              />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Hidden mdDown>
      <Drawer
        anchor="left"
        classes={{ paper: classes.desktopDrawer }}
        open
        variant="persistent"
      >
        {content}
      </Drawer>
    </Hidden>
  )
}

export default NavBar
