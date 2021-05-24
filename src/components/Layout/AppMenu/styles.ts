import { createStyles, makeStyles } from '@material-ui/core'

const drawerWidth = '100%'

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%'
    },
    appSubMenu: {
      width: '100%',
      backgroundColor: '#fcfcfc'
    },
    navList: {
      width: drawerWidth,
      fontSize: 16
    },
    menuItem: {
      width: drawerWidth,
      fontSize: 16,

      '& > .MuiListItemIcon-root': {
        color: '#ccc'
      }
    },
    menuItemSelected: {
      width: drawerWidth,
      fontSize: 16,
      fontWeight: 600,
      backgroundColor: 'rgba(0, 171, 85, 0.08)',
      color: theme.palette.primary.main,
      borderRight: `3px solid ${theme.palette.primary.main}`
    },
    menuItemSubGroup: {
      paddingLeft: theme.spacing(4)
    },
    menuItemSubGroupSelected: {
      paddingLeft: theme.spacing(4),
      backgroundColor: '#f4f4f4'
    },
    menuItemText: {
      fontSize: 14
    }
  })
)

export default useStyles
