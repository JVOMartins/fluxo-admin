import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import DonutLargeOutlinedIcon from '@material-ui/icons/DonutLargeOutlined'

const Reports: React.FC = () => {
  const { text } = useTranslation()
  const router = useRouter()
  return (
    <>
      <Layout
        title="pageTitleReports"
        icon={<DonutLargeOutlinedIcon fontSize="large" />}
      >
        Reports
      </Layout>
    </>
  )
}

export default Reports
