import Layout from '@components/Layout'
import withAuth from '@utils/withAuth'
import { NextPage } from 'next'

const QuestionsPolls: NextPage = () => {
  return (
    <Layout title="Add">
      <p>Questions Polls</p>
    </Layout>
  )
}

export default withAuth(QuestionsPolls)
