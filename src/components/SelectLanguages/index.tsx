import useTranslation from '@contexts/Intl'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useCallback, useState } from 'react'

const SelectLanguage: React.FC = () => {
  const { locale, updateLocale } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLocale = useCallback((key: string) => {
    updateLocale(key)
    setAnchorEl(null)
  }, [])

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {locale}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLocale('pt')}>PT</MenuItem>
        <MenuItem onClick={() => handleLocale('en')}>EN</MenuItem>
      </Menu>
    </div>
  )
}

export default SelectLanguage
