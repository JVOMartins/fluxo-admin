import useTranslation from '@contexts/Intl'
import {
  Box,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core'
import { ReactNode } from 'react'

interface AddButtonProps {
  label: string | object
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  onClick: (event: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative'
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  })
)

const AddButton: React.FC<AddButtonProps> = ({
  label,
  loading,
  disabled,
  icon,
  onClick
}: AddButtonProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  return (
    <>
      <Box className={classes.wrapper}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          disabled={loading || disabled}
          startIcon={!!icon && icon}
          onClick={onClick}
        >
          {loading ? text('btnLoadingText') : label}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Box>
    </>
  )
}

export { AddButton }
