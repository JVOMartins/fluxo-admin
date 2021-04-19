import { LoadingDiv } from '@components/LoadingDiv'
import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core'
import {
  defaultPollQuestion,
  deletePollQuestions,
  getPollQuestions,
  IPollQuestions,
  updatePollQuestions
} from '@services/PollQuestions'
import { useEffect, useState } from 'react'
import { ActionsButton } from '@components/Buttons'
import useTranslation from '@contexts/Intl'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import { InputNumber } from '@components/InputNumber'
import Swal from 'sweetalert2'
import { ListAnswers } from '../Answers/ListAnswers'
import { ModalAnswers } from '../Answers/ModalAnswers'
import { IPollQuestionAnswers } from '@services/PollQuestionsAnswers'
import { ModalFollowUp } from './ModalFollowUp'

const useStyles = makeStyles(theme => ({
  index: {
    fontWeight: 700
  },
  questions: {
    marginBottom: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',

    '& > .options': {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 12 auto',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fafafa',
      marginRight: 8,
      padding: 8,
      borderRadius: 8
    },

    '& > .details': {
      width: '100%'
    }
  },
  question: {
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    '& > .editable': {
      paddingBottom: '10px',
      cursor: 'pointer',
      width: '100%'
    }
  }
}))

interface ListQuestionsProps {
  currentPoll: number
  checkNewsQuestions: boolean
}

const ListQuestions: React.FC<ListQuestionsProps> = ({
  currentPoll,
  checkNewsQuestions
}: ListQuestionsProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [questions, setQuestions] = useState<Array<IPollQuestions>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [editQuestion, setEditQuestion] = useState<number>(-1)
  const [addQuestionAnswer, setAddQuestionAnswer] = useState<IPollQuestions>(
    defaultPollQuestion
  )
  const [followUpQuestion, setFollowUpQuestion] = useState<number>(-1)
  const [editDescription, setEditDescription] = useState<number>(-1)
  const [formNewAnswer, setFormNewAnswer] = useState<boolean>(false)

  const getAllQuestionsByPoll = async (pollId: number) => {
    setLoading(true)
    const res = await getPollQuestions(pollId)
    setQuestions(res)
    setLoading(false)
  }

  const handleAddQuestionAnswer = (add: IPollQuestionAnswers): void => {
    setLoading(true)
    const index = questions.findIndex(item => item.id == add.poll_question_id)
    if (index >= 0) {
      let temp = questions.slice()
      temp[index].answers.push(add)
      temp[index].answers = temp[index].answers
        .sort((a, b) => a.position - b.position)
        .slice()
      setQuestions(temp)
    }
    setLoading(false)
  }

  const handleEditQuestion = async (
    id: number,
    column: string,
    value: string | number
  ): Promise<void> => {
    const val = typeof value === 'string' ? value.trim() : value
    const index = questions.findIndex(
      item => item.id === id && item[column] !== val
    )
    if (index >= 0) {
      await updatePollQuestions(currentPoll, id, { [column]: val })
      let temp = questions.slice()
      temp[index][column] = val
      if (column === 'position') {
        temp = temp.sort((a, b) => a.position - b.position).slice()
      }
      setQuestions(temp)
      setToast({
        type: 'success',
        open: true,
        message: 'Editado com sucesso!'
      })
    }
  }

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Isso irá excluir o item e seus registros',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const index = questions.findIndex(item => item.id === id)
          if (index >= 0) {
            await deletePollQuestions(currentPoll, id)
            setQuestions(questions.filter(item => item.id !== id))
            setToast({
              type: 'success',
              open: true,
              message: 'Excluído com sucesso!'
            })
          }
        } catch (error) {
          setToast({
            type: 'error',
            open: true,
            message: error.message
          })
        }
      }
    })
  }

  useEffect(() => {
    if (!checkNewsQuestions) getAllQuestionsByPoll(currentPoll)
  }, [currentPoll, checkNewsQuestions])

  return (
    <>
      <ToastFloat
        open={toast.open}
        onClose={() => setToast({ open: false })}
        type={toast.type}
        message={toast.message}
      />
      <ModalAnswers
        open={formNewAnswer}
        onClose={answer => {
          setFormNewAnswer(!formNewAnswer)
          setAddQuestionAnswer(defaultPollQuestion)
          handleAddQuestionAnswer(answer)
        }}
        question={addQuestionAnswer}
      />

      <ModalFollowUp
        open={followUpQuestion > 0}
        pollId={currentPoll}
        questionId={followUpQuestion}
        onClose={() => setFollowUpQuestion(-1)}
        onSave={console.log}
      />

      {loading && <LoadingDiv />}
      {!loading && questions.length === 0 && (
        <Typography>{text('registersEmpty')}</Typography>
      )}
      {!loading &&
        questions.length > 0 &&
        questions.map((item, index) => (
          <Box key={item.id} className={classes.questions}>
            <Box className="options">
              <ActionsButton tooltip={text('tooltipOptions')}>
                {item.type.includes('multiple') && (
                  <MenuItem
                    onClick={() => {
                      setAddQuestionAnswer(item)
                      setFormNewAnswer(true)
                    }}
                  >
                    {text('btnNewResponse')}
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    setFollowUpQuestion(item.id)
                  }}
                >
                  {text('btnNewFollowUp')}
                </MenuItem>
                <MenuItem onClick={() => handleDelete(item.id)}>
                  {text('btnDelete')}
                </MenuItem>
              </ActionsButton>
              <InputNumber
                number={item.position}
                min={1}
                onBlur={num => handleEditQuestion(item.id, 'position', num)}
              />
            </Box>
            <Box className="details">
              <Box>
                <Box className={classes.question} tabIndex={-1}>
                  {editQuestion === index ? (
                    <TextField
                      id={`${item.poll_id}_${item?.id}`}
                      label={text('labelEditQuestion')}
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                      defaultValue={item.question}
                      onBlur={event => {
                        handleEditQuestion(
                          item.id,
                          'question',
                          event.target.value
                        )
                        setEditQuestion(-1)
                      }}
                    />
                  ) : (
                    <Tooltip
                      title={`${text('tooltipEditQuestion')}`}
                      placement="top-start"
                    >
                      <Typography
                        variant="body1"
                        onDoubleClick={() => setEditQuestion(index)}
                        className="editable"
                      >
                        {item.question}
                      </Typography>
                    </Tooltip>
                  )}
                  {editDescription === index ? (
                    <TextField
                      id={`${item.poll_id}_${item?.id}`}
                      label={text('labelEditDescription')}
                      rows={1}
                      variant="outlined"
                      fullWidth
                      defaultValue={item.description}
                      onBlur={event => {
                        handleEditQuestion(
                          item.id,
                          'description',
                          event.target.value
                        )
                        setEditDescription(-1)
                      }}
                    />
                  ) : (
                    <Tooltip
                      title={`${text('tooltipEditQuestion')}`}
                      placement="top-start"
                    >
                      <Typography
                        variant="caption"
                        onDoubleClick={() => setEditDescription(index)}
                        className="editable"
                      >
                        {text('labelPollDescription')}: {item.description}
                      </Typography>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              {item.type.includes('multiple') && (
                <Box>
                  <ListAnswers
                    currentQuestionAnswers={item.answers}
                    type={item.type}
                  />
                </Box>
              )}
            </Box>
          </Box>
        ))}
    </>
  )
}

export { ListQuestions }
