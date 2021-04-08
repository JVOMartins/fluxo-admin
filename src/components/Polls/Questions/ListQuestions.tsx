import { Box, Typography } from '@material-ui/core'
import { getPollQuestions, IPollQuestions } from '@services/PollQuestions'
import { useEffect, useState } from 'react'

interface ListQuestionsProps {
  currentPoll: number
}

const ListQuestions: React.FC<ListQuestionsProps> = ({
  currentPoll
}: ListQuestionsProps) => {
  const [questions, setQuestions] = useState<Array<IPollQuestions>>([])
  const getAllQuestionsByPoll = async (pollId: number) => {
    const res = await getPollQuestions(pollId)
    setQuestions(res)
  }

  useEffect(() => {
    getAllQuestionsByPoll(currentPoll)
  }, [])

  return (
    <>
      {questions.map((item, index) => (
        <Box key={item.id}>
          <Box>
            <Typography>#{index + 1} OPTIONS</Typography>
          </Box>
          {item.question}
        </Box>
      ))}
    </>
  )
}

export { ListQuestions }
