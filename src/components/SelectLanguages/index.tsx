import { useCallback, useState } from 'react'

import useTranslation from '@contexts/Intl'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const flagIcon = (key: string, size: number) => (
  <img
    alt={key}
    width={size}
    height={size}
    src={`https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/${key.toUpperCase()}.svg`}
  />
)

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
        {flagIcon(currentLocale, 24)}
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
            {flagIcon(item, 24)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default SelectLanguage
