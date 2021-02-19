import { createStyles, makeStyles } from '@material-ui/core'

const drawerWidth = '100%'

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%'
    },
    appSubMenu: {
      width: '100%',
      backgroundColor: '#fbfbfb'
    },
    navList: {
      width: drawerWidth,
      fontSize: 16
    },
    menuItem: {
      width: drawerWidth,
      fontSize: 16
    },
    menuItemSubGroup: {
      paddingLeft: theme.spacing(4)
    },
    menuItemText: {
      fontSize: 14
    },
    menuItemIcon: {
      color: '#bbb'
    }
  })
)

export default useStyles
