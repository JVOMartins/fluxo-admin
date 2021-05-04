import { LoadingDiv } from '@components/LoadingDiv'
import { Box, makeStyles, Typography } from '@material-ui/core'
import {
  createPollQuestions,
  defaultPollQuestion,
  deletePollQuestions,
  getPollQuestions,
  IPollQuestions,
  updatePollQuestions
} from '@services/PollQuestions'
import React, { useEffect, useState } from 'react'
import useTranslation from '@contexts/Intl'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import Swal from 'sweetalert2'
import { ModalAnswers } from '../Answers/ModalAnswers'
import { IPollQuestionAnswers } from '@services/PollQuestionsAnswers'
import { ModalFollowUp } from './ModalFollowUp'
import { ModalQuestions } from './ModalQuestions'
import { InlineButton } from '@components/Buttons/InlineButton'
import { CardQuestions } from './CardQuestion'

const useStyles = makeStyles(theme => ({
  index: {
    fontWeight: 700
  },
  questions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    '& > .options': {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 12 auto',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fafafa',
      marginRight: 8,
      padding: 8,
      height: '100%'
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
    marginBottom: 24,

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
  const [current, setCurrent] = useState<number | null>()
  const [currentFollowUp, setCurrentFollowUp] = useState<number | null>()
  const [currentFollowUp2, setCurrentFollowUp2] = useState<number | null>()
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
      await getAllQuestionsByPoll(currentPoll)
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
          await getAllQuestionsByPoll(currentPoll)
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
        questions.map(question => (
          <CardQuestions
            key={question.id}
            question={question}
            current={current}
            onClickToExpand={id => setCurrent(id)}
            onAddAnswer={id => {
              setAddQuestionAnswer(questions.find(item => item.id === id))
              setFormNewAnswer(true)
            }}
            onFollowUp={id => {
              setFollowUpQuestion(questions.find(item => item.id === id))
            }}
            onEdit={id => {
              setEditQuestion(questions.find(item => item.id === id))
            }}
            onDelete={id => handleDelete(id)}
            onEditPosition={(id, num) =>
              handleEditQuestion(id, 'position', num)
            }
          >
            {question.followups.length > 0 && (
              <Box className={classes.followups}>
                <Typography component="h6">Follow Ups</Typography>
                {question.followups.map(followup => (
                  <CardQuestions
                    key={followup.id}
                    question={followup}
                    current={currentFollowUp}
                    onClickToExpand={id => setCurrentFollowUp(id)}
                    onAddAnswer={id => {
                      setAddQuestionAnswer(
                        question.followups.find(item => item.id === id)
                      )
                      setFormNewAnswer(true)
                    }}
                    onFollowUp={id => {
                      setFollowUpQuestion(
                        question.followups.find(item => item.id === id)
                      )
                    }}
                    onEdit={id => {
                      setEditQuestion(
                        question.followups.find(item => item.id === id)
                      )
                    }}
                    onDelete={id => handleDelete(id)}
                    onEditPosition={(id, num) =>
                      handleEditQuestion(id, 'position', num)
                    }
                  >
                    {!!followup.followups && followup.followups.length > 0 && (
                      <Box className={classes.followups}>
                        <Typography component="h6">Follow Ups</Typography>
                        {followup.followups.map(followup => (
                          <CardQuestions
                            key={followup.id}
                            question={followup}
                            current={currentFollowUp2}
                            onClickToExpand={id => setCurrentFollowUp2(id)}
                            onAddAnswer={id => {
                              setAddQuestionAnswer(
                                followup.followups.find(item => item.id === id)
                              )
                              setFormNewAnswer(true)
                            }}
                            onFollowUp={id => {
                              setFollowUpQuestion(
                                followup.followups.find(item => item.id === id)
                              )
                            }}
                            onEdit={id => {
                              setEditQuestion(
                                followup.followups.find(item => item.id === id)
                              )
                            }}
                            onDelete={id => handleDelete(id)}
                            onEditPosition={(id, num) =>
                              handleEditQuestion(id, 'position', num)
                            }
                          ></CardQuestions>
                        ))}
                      </Box>
                    )}
                  </CardQuestions>
                ))}
              </Box>
            )}
          </CardQuestions>
        ))}

      <InlineButton
        label={`${text('btnNewQuestions')}`}
        onClick={() => setAddQuestion(true)}
      />
    </>
  )
}

export { ListQuestions }
