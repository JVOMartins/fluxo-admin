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
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import clsx from 'clsx'
import useSettings from '@contexts/Settings'
import useTranslation from '@contexts/Intl'

const AppMenu: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { text } = useTranslation()
  const { settings, saveSettings } = useSettings()

  const handleOpenMenu = (key: string) => {
    switch (key) {
      case 'engagement':
        saveSettings({
          ...settings,
          openEngagementMenu: !settings.openEngagementMenu
        })
        break
      case 'manager':
        saveSettings({
          ...settings,
          openManagerMenu: !settings.openManagerMenu
        })
        break

      default:
        break
    }
  }

  const isSelected = path => router.pathname === path

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      <ListItem
        button
        className={clsx({
          [classes.menuItem]: !isSelected('/'),
          [classes.menuItemSelected]: isSelected('/')
        })}
        onClick={() => {
          handleOpenMenu('engagement')
          router.push('/')
        }}
      >
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={text('menuEngagement')}
          className={classes.menuItemText}
          disableTypography
        />
        {settings.openEngagementMenu ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>

      <Collapse
        in={settings.openEngagementMenu}
        timeout="auto"
        unmountOnExit
        className={classes.appSubMenu}
      >
        <List component="div" disablePadding>
          <ListItem
            button
            className={clsx({
              [classes.menuItemSubGroup]: !isSelected('/engagement/benchmark'),
              [classes.menuItemSubGroupSelected]: isSelected(
                '/engagement/benchmark'
              )
            })}
            onClick={() => router.push('/engagement/benchmark')}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={text('menuEngagementBenchmark')}
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>

          <ListItem
            button
            className={clsx({
              [classes.menuItemSubGroup]: !isSelected('/engagement/reports'),
              [classes.menuItemSubGroupSelected]: isSelected(
                '/engagement/reports'
              )
            })}
            onClick={() => router.push('/engagement/reports')}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={text('menuEngagementReports')}
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem
        button
        className={clsx({
          [classes.menuItem]: !isSelected('/feedback'),
          [classes.menuItemSelected]: isSelected('/feedback')
        })}
        onClick={() => router.push('/feedback')}
      >
        <ListItemIcon>
          <QuestionAnswerOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={text('menuFeedbacks')}
          className={classes.menuItemText}
          disableTypography
        />
      </ListItem>

      <ListItem
        button
        className={clsx({
          [classes.menuItem]: !isSelected('/polls'),
          [classes.menuItemSelected]: isSelected('/polls')
        })}
        onClick={() => router.push('/polls')}
      >
        <ListItemIcon>
          <AssignmentOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={text('menuPolls')}
          className={classes.menuItemText}
          disableTypography
        />
      </ListItem>

      <ListItem
        button
        onClick={() => handleOpenMenu('manager')}
        className={classes.menuItem}
      >
        <ListItemIcon>
          <RecordVoiceOverOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={text('menuManager')}
          className={classes.menuItemText}
          disableTypography
        />
        {settings.openManagerMenu ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>

      <Collapse
        in={settings.openManagerMenu}
        timeout="auto"
        unmountOnExit
        className={classes.appSubMenu}
      >
        <List component="div" disablePadding>
          <ListItem
            button
            className={clsx({
              [classes.menuItemSubGroup]: !isSelected('/manager/users'),
              [classes.menuItemSubGroupSelected]: isSelected('/manager/users')
            })}
            onClick={() => router.push('/manager/users')}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={text('menuManagerUsers')}
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
          <ListItem
            button
            className={clsx({
              [classes.menuItemSubGroup]: !isSelected('/manager/groups'),
              [classes.menuItemSubGroupSelected]: isSelected('/manager/groups')
            })}
            onClick={() => router.push('/manager/groups')}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={text('menuManagerGroups')}
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
          <ListItem
            button
            className={clsx({
              [classes.menuItemSubGroup]: !isSelected('/manager/goals'),
              [classes.menuItemSubGroupSelected]: isSelected('/manager/goals')
            })}
            onClick={() => router.push('/manager/goals')}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={text('menuManagerGoals')}
              className={classes.menuItemText}
              disableTypography
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem
        button
        className={clsx({
          [classes.menuItem]: !isSelected('/config'),
          [classes.menuItemSelected]: isSelected('/config')
        })}
        onClick={() => router.push('/config')}
      >
        <ListItemIcon>
          <SettingsOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={text('menuConfig')}
          className={classes.menuItemText}
          disableTypography
        />
      </ListItem>
    </List>
  )
}

export default AppMenu
