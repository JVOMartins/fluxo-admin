import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import {
  deletePollQuestionAnswers,
  IPollQuestionAnswers
} from '@services/PollQuestionsAnswers'
import React, { useEffect, useState } from 'react'
import { ModalAnswers } from './ModalAnswers'
import Swal from 'sweetalert2'
import { ListText } from './ListText'
import { ListImage } from './ListImage'
import { IPollQuestions } from '@services/PollQuestions'

interface ListAnswersProps {
  question: IPollQuestions
  currentQuestionAnswers: Array<IPollQuestionAnswers>
}

const ListAnswers: React.FC<ListAnswersProps> = ({
  question,
  currentQuestionAnswers
}: ListAnswersProps) => {
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
        question={question}
        editAnswer={answers.find(item => item.id === editAnswer)}
      />
      {question?.type.includes('text') ? (
        <ListText
          answers={answers}
          onDelete={(pollId: number, questionId: number, id: number) =>
            handleDeleteQuestionAnswer(pollId, questionId, id)
          }
          onEdit={id => setEditAnswer(id)}
        />
      ) : (
        <ListImage
          answers={answers}
          onDelete={(pollId: number, questionId: number, id: number) =>
            handleDeleteQuestionAnswer(pollId, questionId, id)
          }
          onEdit={id => setEditAnswer(id)}
        />
      )}
    </>
  )
}

export { ListAnswers }
