import useTranslation from '@contexts/Intl'
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core'
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
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  )
}

export { TitlePage }
