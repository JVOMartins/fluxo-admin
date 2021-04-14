import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import { IPollQuestions } from '@services/PollQuestions'
import { AddButton } from '@components/Buttons'
import {
  createPollQuestionAnswers,
  defaultPollQuestionAnswers,
  IPollQuestionAnswers,
  updatePollQuestionAnswers
} from '@services/PollQuestionsAnswers'

interface ModalAnswersProps {
  open: boolean
  question?: IPollQuestions
  editAnswer?: IPollQuestionAnswers
  onClose: (event: any) => void
}

const ModalAnswers: React.FC<ModalAnswersProps> = ({
  open,
  question,
  editAnswer,
  onClose
}: ModalAnswersProps) => {
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [loading, setLoading] = useState<boolean>(false)
  const [answer, setAnswer] = useState<IPollQuestionAnswers>(
    editAnswer || defaultPollQuestionAnswers
  )

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ): void => {
    const { name, value } = event.target
    setAnswer({
      ...answer,
      [name]: typeof value === 'string' ? value.trim() : value
    })
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      let edited = {}
      !!editAnswer
        ? (edited = await updatePollQuestionAnswers(
            editAnswer.poll_id,
            editAnswer.poll_question_id,
            editAnswer.id,
            answer
          ))
        : (edited = await createPollQuestionAnswers(
            question.poll_id,
            question.id,
            answer
          ))
      setToast({
        type: 'success',
        open: true,
        message: 'Gravado com sucesso!'
      })
      setAnswer(defaultPollQuestionAnswers)
      onClose(edited)
    } catch (error) {
      setToast({
        type: 'error',
        open: true,
        message: error.message
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    !!editAnswer && setAnswer(editAnswer)
  }, [editAnswer])

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
          {!!editAnswer ? text('titleEditAnswer') : text('titleNewAnswer')}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="position"
            type="number"
            label={`${text('labelPollPosition')}`}
            variant="outlined"
            value={answer?.position}
            onChange={event => handleChange(event)}
            fullWidth
            margin="normal"
          />
          {(question?.type.includes('text') || !!editAnswer?.value) && (
            <TextField
              name="value"
              label={`${text('labelPollAnswerValue')}`}
              variant="outlined"
              value={answer?.value}
              onChange={event => handleChange(event)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          )}
          {question?.type.includes('image') && (
            <label htmlFor="button-file">
              <input
                accept="image/*"
                id="button-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                value={answer?.value}
                onChange={event => handleChange(event)}
              />
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          )}
          <TextField
            name="description"
            label={`${text('labelPollAnswerDescription')}`}
            variant="outlined"
            value={answer?.description}
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

export { ModalAnswers }
