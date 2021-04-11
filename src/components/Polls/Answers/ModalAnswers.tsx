import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import {
  createPollQuestions,
  defaultPollQuestion,
  IPollQuestions
} from '@services/PollQuestions'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { AddButton } from '@components/Buttons'

interface ModalPollsProps {
  open: boolean
  pollId: number
  onClose: (event: any) => void
}

const ModalQuestions: React.FC<ModalPollsProps> = ({
  open,
  pollId,
  onClose
}: ModalPollsProps) => {
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [loading, setLoading] = useState<boolean>(false)
  const [question, setQuestion] = useState<IPollQuestions>(defaultPollQuestion)

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ): void => {
    const { name, value } = event.target
    setQuestion({ ...question, [name]: value })
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      await createPollQuestions(pollId, question)
      setQuestion(defaultPollQuestion)
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
    setLoading(false)
    onClose(true)
  }

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
            name="position"
            type="number"
            label={`${text('labelPollQuestionPosition')}`}
            variant="outlined"
            value={question.position}
            onChange={event => handleChange(event)}
            fullWidth
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-age-native-simple">
              {text('labelPollQuestionType')}
            </InputLabel>
            <Select
              native
              value={question.type}
              onChange={event => handleChange(event)}
              label={`${text('labelPollQuestionType')}`}
              inputProps={{
                name: 'type',
                id: 'type'
              }}
            >
              <option aria-label="None" value="" />
              <option value="paragraph">
                {text('labelPollQuestionTypeParagraph')}
              </option>
              <option value="multiple_text">
                {text('labelPollQuestionTypeMultipleText')}
              </option>
              <option value="multiple_image">
                {text('labelPollQuestionTypeMultipleImage')}
              </option>
              <option value="zeroten">
                {text('labelPollQuestionTypeZeroten')}
              </option>
            </Select>
          </FormControl>
          <TextField
            name="question"
            label={`${text('labelPollQuestion')}`}
            variant="outlined"
            value={question.question}
            onChange={event => handleChange(event)}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label={`${text('labelPollDescription')}`}
            variant="outlined"
            value={question.description}
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

export { ModalQuestions }
