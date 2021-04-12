import { IconButton, Menu, Tooltip } from '@material-ui/core'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined'
import { ReactNode, useState } from 'react'

interface ActionsButtonProps {
  children?: ReactNode
  size?: 'small' | 'medium'
  tooltip?: string | object
  icon?: ReactNode
}

const ActionsButton: React.FC<ActionsButtonProps> = ({
  children,
  size,
  tooltip,
  icon
}: ActionsButtonProps) => {
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
      <Tooltip title={tooltip}>
        <IconButton onClick={handleClick} size={size}>
          {!!icon ? icon : <MoreVertOutlinedIcon fontSize="inherit" />}
        </IconButton>
      </Tooltip>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  )
}

export { ActionsButton }
