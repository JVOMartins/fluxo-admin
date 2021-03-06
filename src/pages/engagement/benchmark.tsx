import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { useRouter } from 'next/router'
import CompareOutlinedIcon from '@material-ui/icons/CompareOutlined'

const Benchmark: React.FC = () => {
  const { text } = useTranslation()
  const router = useRouter()
  return (
    <>
      <Layout
        title="pageTitleBenchmark"
        icon={<CompareOutlinedIcon fontSize="large" />}
      >
        Benchmark
      </Layout>
    </>
  )
}

export default Benchmark
