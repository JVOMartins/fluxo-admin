import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import Link from 'next/link'

interface InlineButtonProps {
  label: string | object
  onClick: (event: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: 40,
      marginBottom: 40,
      position: 'relative',
      borderBottom: `2px solid ${theme.palette.success.main}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5,
      transition: 'all 0.5s',
      cursor: 'pointer',
      '&:hover': {
        opacity: 1
      }
    },
    link: {
      color: theme.palette.primary.main,
      position: 'absolute',
      backgroundColor: '#fff',
      padding: '0 40px',
      marginTop: 0,
      textDecoration: 'none'
    }
  })
)

const InlineButton: React.FC<InlineButtonProps> = ({
  label,
  onClick
}: InlineButtonProps) => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.wrapper}>
        <Link href="#">
          <a onClick={onClick} className={classes.link}>
            {label}
          </a>
        </Link>
      </Box>
    </>
  )
}

export { InlineButton }
