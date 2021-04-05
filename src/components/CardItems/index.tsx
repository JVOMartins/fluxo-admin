import { Box } from '@material-ui/core'
import clsx from 'clsx'
import { ReactNode } from 'react'
import useStyles from './styles'

interface CardItemsProps {
  children: ReactNode
  active?: boolean
  onClick?: (event: any) => void
}

const CardItems: React.FC<CardItemsProps> = ({
  children,
  active,
  onClick
}: CardItemsProps) => {
  const classes = useStyles()
  return (
    <>
      <Box
        className={clsx({
          [classes.card]: !active,
          [classes.cardActive]: active
        })}
        onClick={onClick}
      >
        {children}
      </Box>
    </>
  )
}

export { CardItems }
