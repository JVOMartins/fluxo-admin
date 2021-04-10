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

    '& > p': {
      padding: '10px 0',
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

  const getAllQuestionsByPoll = async (pollId: number) => {
    setLoading(true)
    const res = await getPollQuestions(pollId)
    setQuestions(res)
    setLoading(false)
  }

  const handleEditQuestion = async (
    id: number,
    value: string
  ): Promise<void> => {
    const index = questions.findIndex(
      item => item.id === id && item.question !== value.trim()
    )
    if (index >= 0) {
      await updatePollQuestions(currentPoll, id, { question: value.trim() })
      let temp = questions.slice()
      temp[index].question = value.trim()
      setQuestions(temp)
      setToast({
        type: 'success',
        open: true,
        message: 'Editado com sucesso!'
      })
    }
  }

  const handleEditPositions = async (
    id: number,
    value: number
  ): Promise<void> => {
    await updatePollQuestions(currentPoll, id, { position: value })
    const index = questions.findIndex(item => item.id === id)
    setToast({
      type: 'success',
      open: true,
      message: 'Editado com sucesso!'
    })
    getAllQuestionsByPoll(currentPoll)
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
                <MenuItem>Nova Resposta</MenuItem>
                <MenuItem>Excluir</MenuItem>
              </ActionsButton>
              <InputNumber
                number={item.position}
                min={1}
                onBlur={num => handleEditPositions(item.id, num)}
              />
            </Box>
            <Box className="details">
              <Box className={classes.index}></Box>
              <Box>
                <Box className={classes.question}>
                  {editQuestion === index ? (
                    <TextField
                      id={`${item.poll_id}_${item?.id}`}
                      label="Editar"
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                      defaultValue={item.question}
                      onBlur={event => {
                        handleEditQuestion(item.id, event.target.value)
                        setEditQuestion(-1)
                      }}
                    />
                  ) : (
                    <Tooltip
                      title={`${text('tooltipEditQuestion')}`}
                      arrow
                      placement="top-start"
                    >
                      <Typography
                        variant="body1"
                        onDoubleClick={() => setEditQuestion(index)}
                      >
                        {item.question}
                      </Typography>
                    </Tooltip>
                  )}
                </Box>
              </Box>
              <Box>
                Respostas
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Box>
            </Box>
          </Box>
        ))}
    </>
  )
}

export { ListQuestions }
