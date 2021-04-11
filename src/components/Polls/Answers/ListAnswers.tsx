interface ListAnswersProps {
  currentPoll: number
  currentQuestion: number
}

const ListAnswers: React.FC<ListAnswersProps> = ({
  currentPoll,
  currentQuestion
}: ListAnswersProps) => {
  return (
    <>
      <p>
        ListAnswers - {currentPoll} - {currentQuestion}
      </p>
    </>
  )
}

export { ListAnswers }
