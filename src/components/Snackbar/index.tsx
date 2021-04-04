import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { Color } from '@material-ui/lab/Alert'

export interface ToastProps {
  type?: Color
  message?: string
  open?: boolean
  onClose?: (event: any) => void
}

export const defaultToast = {
  message: '',
  open: false
}

const ToastFloat: React.FC<ToastProps> = ({
  type,
  message,
  open,
  onClose
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert
        elevation={2}
        variant="filled"
        onClose={onClose}
        severity={type || 'info'}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default ToastFloat
