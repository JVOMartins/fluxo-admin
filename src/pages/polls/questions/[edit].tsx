import Layout from '@components/Layout'
import withAuth from '@utils/withAuth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const QuestionsPolls: NextPage = () => {
  const router = useRouter()
  const { edit } = router.query
  return (
    <Layout title="Edit">
      <p>Questions Polls {edit}</p>
    </Layout>
  )
}

export default withAuth(QuestionsPolls)
