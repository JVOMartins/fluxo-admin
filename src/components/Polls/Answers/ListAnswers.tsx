import { InputNumber } from '@components/InputNumber'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip
} from '@material-ui/core'
import {
  IPollQuestionAnswers,
  updatePollQuestionAnswers
} from '@services/PollQuestionsAnswers'
import { useEffect, useState } from 'react'

interface ListAnswersProps {
  currentQuestionAnswers: Array<IPollQuestionAnswers>
}

const useStyles = makeStyles(theme => ({
  list: {
    maxWidth: 300,
    outline: 'none'
  },
  listItem: {
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    padding: 16
  }
}))

const ListAnswers: React.FC<ListAnswersProps> = ({
  currentQuestionAnswers
}: ListAnswersProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [editAnswer, setEditAnswer] = useState<number>(-1)
  const [answers, setAnswers] = useState<Array<IPollQuestionAnswers>>([])

  const handleEditQuestionAnswer = async (
    id: number,
    column: string,
    value: string | number
  ): Promise<void> => {
    const val = typeof value === 'string' ? value.trim() : value
    const index = answers.findIndex(
      item => item.id === id && item[column] !== val
    )
    if (index >= 0) {
      await updatePollQuestionAnswers(
        answers[index].poll_id,
        answers[index].poll_question_id,
        id,
        { [column]: val }
      )
      let temp = answers.slice()
      temp[index][column] = val
      if (column === 'position') {
        temp = temp.sort((a, b) => a.position - b.position).slice()
      }
      setAnswers(temp)
      setToast({
        type: 'success',
        open: true,
        message: 'Editado com sucesso!'
      })
    }
  }

  useEffect(() => {
    setAnswers(currentQuestionAnswers)
  }, [currentQuestionAnswers])

  return (
    <>
      <ToastFloat
        open={toast.open}
        onClose={() => setToast({ open: false })}
        type={toast.type}
        message={toast.message}
      />

      <List
        dense
        className={classes.list}
        onBlur={() => setEditAnswer(-1)}
        tabIndex={-1}
      >
        {!!answers &&
          answers.map(item => (
            <>
              {editAnswer !== item.id ? (
                <Tooltip
                  title={`${text('tooltipEditQuestion')}`}
                  placement="top-start"
                >
                  <ListItem
                    key={item.id}
                    className={classes.listItem}
                    onDoubleClick={() => setEditAnswer(item.id)}
                  >
                    <ListItemIcon>{item.position}</ListItemIcon>
                    <ListItemText
                      primary={item.value}
                      secondary={item.description}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  onDoubleClick={() => setEditAnswer(item.id)}
                >
                  <Box>{item.value}</Box>
                  <ListItemSecondaryAction>
                    <InputNumber
                      number={item.position}
                      min={1}
                      onBlur={num =>
                        handleEditQuestionAnswer(item.id, 'position', num)
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </>
          ))}
      </List>
    </>
  )
}

export { ListAnswers }
