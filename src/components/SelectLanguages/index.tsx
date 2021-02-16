import { useCallback, useState } from 'react'
import { FlagIcon } from 'react-flag-kit'

import useTranslation from '@contexts/Intl'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { type } from 'os'

const SelectLanguage: React.FC = () => {
  const { currentLocale, updateLocale, avaliableLocales } = useTranslation()
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
        <FlagIcon code={currentLocale.toUpperCase()} size={24} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {avaliableLocales.map((item, index) => (
          <MenuItem onClick={() => handleLocale(item)} key={index}>
            <FlagIcon code={item.toUpperCase()} size={24} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default SelectLanguage
