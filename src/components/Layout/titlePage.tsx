import useTranslation from '@contexts/Intl'
import { Box, Typography } from '@material-ui/core'
import { ReactNode } from 'react'
import useStyles from './styles'

interface TitlePageProps {
  title: string
  icon: ReactNode
}

const TitlePage: React.FC<TitlePageProps> = ({
  title,
  icon
}: TitlePageProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  return (
    <Box className={classes.titlePage}>
      <Box className={classes.icon}>{icon}</Box>
      <Box>
        <Typography variant="h4" component="h1" className={classes.title}>
          {text(title)}
        </Typography>
      </Box>
    </Box>
  )
}

export { TitlePage }
