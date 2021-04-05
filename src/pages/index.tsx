import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import withAuth from '@utils/withAuth'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const { text } = useTranslation()
  const router = useRouter()
  return (
    <>
      <Layout
        title="pageDashboardTitle"
        icon={<DashboardOutlinedIcon fontSize="large" />}
      >
        Index
      </Layout>
    </>
  )
}

export default withAuth(Home)
