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
  createPollQuestions,
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
import { ModalQuestions } from './ModalQuestions'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { InlineButton } from '@components/Buttons/InlineButton'

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
  },
  followups: {
    marginTop: 24,

    '& > h6': {
      marginBottom: 24,
      marginLeft: 8,
      color: theme.palette.primary.main,
      fontWeight: 700
    }
  }
}))

interface ListQuestionsProps {
  currentPoll: number
}

const ListQuestions: React.FC<ListQuestionsProps> = ({
  currentPoll
}: ListQuestionsProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [questions, setQuestions] = useState<Array<IPollQuestions>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [editQuestion, setEditQuestion] = useState<IPollQuestions>(null)
  const [addQuestionAnswer, setAddQuestionAnswer] = useState<IPollQuestions>(
    defaultPollQuestion
  )
  const [addQuestion, setAddQuestion] = useState<boolean>(false)
  const [followUpQuestion, setFollowUpQuestion] = useState<IPollQuestions>(null)
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
    setLoading(true)
    try {
      const val = typeof value === 'string' ? value.trim() : value
      await updatePollQuestions(currentPoll, id, { [column]: val })
      await getAllQuestionsByPoll(currentPoll)
      setToast({
        type: 'success',
        open: true,
        message: 'Editado com sucesso!'
      })
    } catch (error) {
      setToast({
        type: 'error',
        open: true,
        message: error.message
      })
    }
    setLoading(false)
  }

  const handleAddQuestion = async (question: IPollQuestions) => {
    setLoading(true)
    try {
      if (question.id) {
        delete question.followups
        delete question.answers
        delete question.updated_at
        await updatePollQuestions(question.poll_id, question.id, question)
      } else {
        await createPollQuestions(currentPoll, question)
      }
      getAllQuestionsByPoll(currentPoll)
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
          await deletePollQuestions(currentPoll, id)
          getAllQuestionsByPoll(currentPoll)
          setToast({
            type: 'success',
            open: true,
            message: 'Excluído com sucesso!'
          })
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
    getAllQuestionsByPoll(currentPoll)
  }, [currentPoll])

  return (
    <>
      <ToastFloat
        open={toast.open}
        onClose={() => setToast({ open: false })}
        type={toast.type}
        message={toast.message}
      />

      <ModalQuestions
        open={addQuestion || !!editQuestion}
        editQuestion={editQuestion}
        onClose={() => {
          setAddQuestion(false)
          setEditQuestion(null)
        }}
        onSave={question => {
          handleAddQuestion(question)
        }}
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
        open={!!followUpQuestion}
        pollId={currentPoll}
        currentQuestion={followUpQuestion}
        onClose={() => setFollowUpQuestion(null)}
        onSave={followup => {
          handleAddQuestion(followup)
        }}
        loading={loading}
      />

      {loading && <LoadingDiv />}
      {!loading && questions.length === 0 && (
        <Typography>{text('registersEmpty')}</Typography>
      )}
      {!loading &&
        questions.length > 0 &&
        questions.map((item, index) => (
          <>
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
                  {(item.type.includes('multiple') ||
                    item.type.includes('zeroten')) && (
                    <MenuItem
                      onClick={() => {
                        setFollowUpQuestion(item)
                      }}
                    >
                      {text('btnNewFollowUp')}
                    </MenuItem>
                  )}
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
                  <Tooltip
                    title={`${text('tooltipEditQuestion')}`}
                    placement="top-start"
                  >
                    <Box
                      className={classes.question}
                      tabIndex={-1}
                      onDoubleClick={() => setEditQuestion(item)}
                    >
                      <Typography variant="body1" className="editable">
                        {item.question}
                      </Typography>
                      <Typography variant="caption" className="editable">
                        {text('labelPollDescription')}: {item.description}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
                {item.type.includes('multiple') && (
                  <Box>
                    <ListAnswers
                      currentQuestionAnswers={item.answers}
                      question={item}
                    />
                  </Box>
                )}
                {item.followups.length > 0 && (
                  <Box className={classes.followups}>
                    <Typography component="h6">Follow Ups</Typography>
                    {item.followups.map(item => (
                      <Box key={item.id} className={classes.questions}>
                        <Box className="options">
                          <Tooltip title={text(item.type)}>
                            <InfoOutlinedIcon />
                          </Tooltip>
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
                            <MenuItem onClick={() => handleDelete(item.id)}>
                              {text('btnDelete')}
                            </MenuItem>
                          </ActionsButton>
                          <InputNumber
                            number={item.position}
                            min={1}
                            onBlur={num => {
                              console.log(num)
                              handleEditQuestion(item.id, 'position', num)
                            }}
                          />
                        </Box>
                        <Box className="details">
                          <Box>
                            <Tooltip
                              title={`${text('tooltipEditQuestion')}`}
                              placement="top-start"
                            >
                              <Box
                                className={classes.question}
                                tabIndex={-1}
                                onDoubleClick={() => setEditQuestion(item)}
                              >
                                <Typography
                                  variant="body1"
                                  className="editable"
                                >
                                  {item.question}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  className="editable"
                                >
                                  {text('labelPollDescription')}:{' '}
                                  {item.description}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Box>
                          {item.type.includes('multiple') && (
                            <Box>
                              <ListAnswers
                                currentQuestionAnswers={item.answers}
                                question={item}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </>
        ))}

      <InlineButton
        label={`${text('btnNewQuestions')}`}
        onClick={() => setAddQuestion(true)}
      />
    </>
  )
}

export { ListQuestions }
