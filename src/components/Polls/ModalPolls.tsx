import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import { createPolls, defaultPoll, IPolls, updatePoll } from '@services/Polls'
import { AddButton } from '@components/Buttons'

interface ModalPollsProps {
  open: boolean
  onClose: (event: any) => void
  currentEditPoll?: IPolls
}

const ModalPolls: React.FC<ModalPollsProps> = ({
  open,
  onClose,
  currentEditPoll
}: ModalPollsProps) => {
  const { text } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [poll, setPoll] = useState<IPolls>(currentEditPoll || defaultPoll)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    setPoll({ ...poll, [name]: value })
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      currentEditPoll.id
        ? await updatePoll(currentEditPoll.id, poll)
        : await createPolls(poll)
      setToast({
        type: 'success',
        open: true,
        message: 'Gravado com sucesso!'
      })
    } catch (error) {
      setToast({
        type: 'error',
        open: true,
        message: error.message
      })
    }
    setPoll(defaultPoll)
    setLoading(false)
    onClose(true)
  }

  useEffect(() => {
    currentEditPoll ? setPoll(currentEditPoll) : setPoll(defaultPoll)
  }, [currentEditPoll])

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
        aria-labelledby="form-poll"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-poll">{text('titleNewPolls')}</DialogTitle>
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
          <Button onClick={onClose} color="primary" size="small">
            {text('btnClose')}
          </Button>
          <AddButton
            label={text('btnSave')}
            loading={loading}
            onClick={() => handleClick()}
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalPolls }
