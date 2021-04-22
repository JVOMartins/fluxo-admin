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
  createPollQuestionAnswersImage,
  defaultPollQuestionAnswers,
  IPollQuestionAnswers,
  updatePollQuestionAnswers
} from '@services/PollQuestionsAnswers'
import { IconButton, makeStyles } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

interface ModalAnswersProps {
  open: boolean
  question?: IPollQuestions
  type?: string
  editAnswer?: IPollQuestionAnswers
  onClose: (event: any) => void
  onSave?: (event: any) => void
}

const useStyles = makeStyles(theme => ({
  dropzone: {
    width: '100%',
    height: 100,
    backgroundColor: '#eee',
    border: '2px dashed #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > label': {
      cursor: 'pointer',
      color: '#999',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    '& > img': {
      padding: 20
    }
  },
  imageSelected: {
    width: '100%',
    height: '100%',
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    '& > button': {
      color: 'red',
      position: 'absolute',
      zIndex: 2,
      bottom: -20
    },
    '& > img': {
      position: 'absolute',
      zIndex: 1
    }
  }
}))

const ModalAnswers: React.FC<ModalAnswersProps> = ({
  open,
  question,
  editAnswer,
  onClose
}: ModalAnswersProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState(null)
  const [answer, setAnswer] = useState<IPollQuestionAnswers>(
    editAnswer || defaultPollQuestionAnswers
  )

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ): void => {
    const { name, value } = event.target
    setAnswer({ ...answer, [name]: value })
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      let res = {}
      !!editAnswer
        ? (res = await updatePollQuestionAnswers(
            editAnswer.poll_id,
            editAnswer.poll_question_id,
            editAnswer.id,
            answer
          ))
        : (res = await createPollQuestionAnswers(
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
      onClose(res)
    } catch (error) {
      setToast({
        type: 'error',
        open: true,
        message: error.message
      })
    }
    setLoading(false)
  }

  const handleUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('position', (answer.position as unknown) as string)
      formData.append('description', answer.description)
      formData.append('file', file)

      const res = await createPollQuestionAnswersImage(
        question.poll_id,
        question.id,
        formData
      )
      setAnswer(defaultPollQuestionAnswers)
      setFile(null)
      onClose(res)
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
          {question?.type.includes('text') && (
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
            <>
              {!file ? (
                <div className={classes.dropzone}>
                  <input
                    accept="image/*"
                    id="button-file"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onChange={event => setFile(event.target.files[0])}
                  />
                  <label htmlFor="button-file">
                    {text('labelPollSelectImage')}
                  </label>
                </div>
              ) : (
                <div className={classes.imageSelected}>
                  <IconButton onClick={() => setFile(null)}>
                    <HighlightOffIcon />
                  </IconButton>
                  <img src={URL.createObjectURL(file)} width={200} />
                </div>
              )}
            </>
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
          {question?.type.includes('image') ? (
            <AddButton
              label={text('btnSave')}
              loading={loading}
              onClick={() => handleUpload()}
            />
          ) : (
            <AddButton
              label={text('btnSave')}
              loading={loading}
              onClick={() => handleClick()}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalAnswers }
