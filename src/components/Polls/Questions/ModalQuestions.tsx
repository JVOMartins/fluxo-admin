import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import { defaultPollQuestion, IPollQuestions } from '@services/PollQuestions'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { AddButton } from '@components/Buttons'

interface ModalQuestionsProps {
  open: boolean
  editQuestion?: IPollQuestions
  loading?: boolean
  onClose: (event: any) => void
  onSave: (question: IPollQuestions) => void
}

const ModalQuestions: React.FC<ModalQuestionsProps> = ({
  open,
  editQuestion,
  loading,
  onClose,
  onSave
}: ModalQuestionsProps) => {
  const { text } = useTranslation()
  const [question, setQuestion] = useState<IPollQuestions>(
    editQuestion || defaultPollQuestion
  )

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ): void => {
    const { name, value } = event.target
    setQuestion({ ...question, [name]: value })
  }

  const handleOnSubmit = async () => {
    onSave(question)
    if (!loading) onClose(true)
  }

  useEffect(() => {
    !!editQuestion && setQuestion(editQuestion)
  }, [editQuestion])

  return (
    <>
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
            label={`${text('labelPollPosition')}`}
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
          <Button
            onClick={() => {
              setQuestion(defaultPollQuestion)
              onClose(true)
            }}
            color="primary"
          >
            {text('btnClose')}
          </Button>
          <AddButton
            label={text('btnSave')}
            loading={loading}
            onClick={() => handleOnSubmit()}
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalQuestions }
