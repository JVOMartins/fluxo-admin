import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import { defaultPoll, IPolls } from '@services/Polls'

interface ModalPollsProps {
  open: boolean
  onClose: (event: any) => void
}

const ModalQuestions: React.FC<ModalPollsProps> = ({
  open,
  onClose
}: ModalPollsProps) => {
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [poll, setPoll] = useState<IPolls>(defaultPoll)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    setPoll({ ...poll, [name]: value })
  }

  useEffect(() => {}, [])

  return (
    <>
      <ToastFloat
        open={toast.open}
        onClose={() => setToast({ open: false })}
        type={toast.type}
        message={toast.message}
      />
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-question"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-question">
          {text('titleNewQuestions')}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label={`${text('labelPollName')}`}
            variant="outlined"
            value={poll.name}
            onChange={event => handleChange(event)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label={`${text('labelPollDescription')}`}
            variant="outlined"
            value={poll.description}
            onChange={event => handleChange(event)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button onClick={onClose} color="primary">
            {text('btnClose')}
          </Button>
          <Button color="primary" variant="contained">
            {text('btnSave')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalQuestions }
