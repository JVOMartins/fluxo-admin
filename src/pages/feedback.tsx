import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined'

const Home: React.FC = () => {
  const { text } = useTranslation()
  const router = useRouter()
  return (
    <>
      <Layout
        title="pageTitleFeedbacks"
        icon={<ForumOutlinedIcon fontSize="large" />}
      >
        Feedback
      </Layout>
    </>
  )
}

export default Home
