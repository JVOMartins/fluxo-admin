import { IPollQuestionAnswersVotes } from '@services/PollQuestionsAnswers'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import convertDate from '@utils/convertDate'

interface TextProps {
  votes: Array<IPollQuestionAnswersVotes>
}

const Text: React.FC<TextProps> = ({ votes }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'token', headerName: 'Token', flex: 2 },
    { field: 'vote', headerName: 'Resposta', flex: 8 },
    { field: 'created_at', headerName: 'Criado em', flex: 2 }
  ]

  const data = votes.map(item => ({
    id: item.id,
    token: item.token,
    vote: item.vote,
    created_at: convertDate(item.created_at)
  }))

  return (
    <>
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={10} />
      </div>
    </>
  )
}

export { Text }
