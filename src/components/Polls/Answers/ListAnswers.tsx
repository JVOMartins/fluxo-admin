import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import useTranslation from '@contexts/Intl'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip
} from '@material-ui/core'
import {
  deletePollQuestionAnswers,
  IPollQuestionAnswers
} from '@services/PollQuestionsAnswers'
import React, { useEffect, useState } from 'react'
import { ModalAnswers } from './ModalAnswers'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Swal from 'sweetalert2'

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
    borderBottom: '1px solid #eee'
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
    edit: IPollQuestionAnswers
  ): Promise<void> => {
    console.log(edit)
    const index = answers.findIndex(item => item.id === edit.id)
    if (index >= 0) {
      let temp = answers.slice()
      temp[index] = edit
      temp = temp.sort((a, b) => a.position - b.position).slice()
      setAnswers(temp)
    }
  }

  const handleDeleteQuestionAnswer = async (
    pollId: number,
    pollQuestionId: number,
    id: number
  ): Promise<void> => {
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
          await deletePollQuestionAnswers(pollId, pollQuestionId, id)
          setToast({
            type: 'success',
            open: true,
            message: 'Gravado com sucesso!'
          })
          const index = answers.findIndex(item => item.id === id)
          if (index >= 0) {
            let temp = answers.slice()
            temp = temp
              .filter(item => item.id !== id)
              .sort((a, b) => a.position - b.position)
            setAnswers(temp)
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
      <ModalAnswers
        open={editAnswer === -1 ? false : true}
        onClose={answer => {
          handleEditQuestionAnswer(answer)
          setEditAnswer(-1)
        }}
        editAnswer={answers.find(item => item.id === editAnswer)}
      />
      <List dense className={classes.list}>
        {!!answers &&
          answers.map(item => (
            <React.Fragment key={item.id}>
              <Tooltip
                title={`${text('tooltipEditQuestion')}`}
                placement="top-start"
              >
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  onDoubleClick={() => {
                    setEditAnswer(item.id)
                  }}
                >
                  <ListItemIcon>{item.position}</ListItemIcon>
                  <ListItemText
                    primary={item.value}
                    secondary={item.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleDeleteQuestionAnswer(
                          item.poll_id,
                          item.poll_question_id,
                          item.id
                        )
                      }
                    >
                      <DeleteOutlineOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Tooltip>
            </React.Fragment>
          ))}
      </List>
    </>
  )
}

export { ListAnswers }
