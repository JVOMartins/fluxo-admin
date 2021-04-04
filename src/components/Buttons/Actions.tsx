import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined'
import { useState } from 'react'

const ActionsButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title="Exportar">
        <IconButton onClick={handleClick}>
          <MoreVertOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Excel</MenuItem>
      </Menu>
    </>
  )
}

export { ActionsButton }
