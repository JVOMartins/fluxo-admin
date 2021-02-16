import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'

const Home: React.FC = () => {
  const { text } = useTranslation()

  return (
    <div>
      <Layout title="Dashboard">
        <h1>{text('about')} </h1>
        <p>{text('slogan')} </p>
      </Layout>
    </div>
  )
}

export default Home
