import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useTranslation from '@contexts/Intl'
import { defaultPollQuestion, IPollQuestions } from '@services/PollQuestions'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { AddButton } from '@components/Buttons'
import { IPollQuestionAnswers } from '@services/PollQuestionsAnswers'

interface ModalFollowUpProps {
  open: boolean
  pollId: number
  questionId: number
  type?: string
  editFollowUp?: IPollQuestions | null
  answers?: IPollQuestionAnswers
  loading?: boolean
  onSave: (question: IPollQuestions) => void
  onClose: (event: any) => void
}

const ModalFollowUp: React.FC<ModalFollowUpProps> = ({
  open,
  pollId,
  questionId,
  answers,
  editFollowUp = null,
  loading,
  type,
  onClose,
  onSave
}: ModalFollowUpProps) => {
  const { text } = useTranslation()
  const [question, setQuestion] = useState<IPollQuestions>(
    editFollowUp || defaultPollQuestion
  )

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ): void => {
    const { name, value } = event.target
    setQuestion({ ...question, [name]: value })
  }

  const handleOnSave = () => {
    const data = {
      ...question,
      poll_id: pollId,
      follow_up: questionId
    }

    onSave(data)
  }

  useEffect(() => {
    editFollowUp && setQuestion(editFollowUp)
  }, [editFollowUp])

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
          {!editFollowUp
            ? text('titleNewQuestionsFollowUp')
            : text('titleEditQuestionsFollowUp')}
        </DialogTitle>
        <DialogContent>
          {!!type && type.includes('zeroten') && (
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="outlined-age-native-simple">
                Mostre se a resposta for
              </InputLabel>
              <Select
                native
                value={question.follow_up_role}
                onChange={event => handleChange(event)}
                label={`Mostre se a resposta for`}
                inputProps={{
                  name: 'follow_up_role',
                  id: 'follow_up_role'
                }}
              >
                <option aria-label="None" value="" />
                <option value="detrator">detrator</option>
                <option value="neutro">neutro</option>
                <option value="promotor">promotor</option>
              </Select>
            </FormControl>
          )}
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
          <Button onClick={onClose} color="primary">
            {text('btnClose')}
          </Button>
          <AddButton
            label={text('btnSave')}
            loading={loading}
            onClick={() => handleOnSave()}
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalFollowUp }
