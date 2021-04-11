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
  getPollQuestions,
  IPollQuestions,
  updatePollQuestions
} from '@services/PollQuestions'
import { useEffect, useState } from 'react'
import { ActionsButton } from '@components/Buttons'
import useTranslation from '@contexts/Intl'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import { InputNumber } from '@components/InputNumber'

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
}

const ListQuestions: React.FC<ListQuestionsProps> = ({
  currentPoll
}: ListQuestionsProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [questions, setQuestions] = useState<Array<IPollQuestions>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [editQuestion, setEditQuestion] = useState<number>(-1)
  const [editDescription, setEditDescription] = useState<number>(-1)

  const getAllQuestionsByPoll = async (pollId: number) => {
    setLoading(true)
    const res = await getPollQuestions(pollId)
    setQuestions(res)
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
      {loading && <LoadingDiv />}
      {!loading &&
        questions.map((item, index) => (
          <Box key={item.id} className={classes.questions}>
            <Box className="options">
              <ActionsButton>
                {item.type.includes('multiple') && (
                  <MenuItem>Nova Resposta</MenuItem>
                )}
                <MenuItem>Excluir</MenuItem>
              </ActionsButton>
              <InputNumber
                number={item.position}
                min={1}
                onBlur={num => handleEditQuestion(item.id, 'position', num)}
              />
            </Box>
            <Box className="details">
              <Box className={classes.index}></Box>
              <Box>
                <Box className={classes.question} tabIndex={-1}>
                  {editQuestion === index ? (
                    <TextField
                      id={`${item.poll_id}_${item?.id}`}
                      label="Editar Pergunta"
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
                      label="Editar Descrição"
                      multiline
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
                        Descrição: {item.description}
                      </Typography>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              <Box>Respostas</Box>
            </Box>
          </Box>
        ))}
    </>
  )
}

export { ListQuestions }
