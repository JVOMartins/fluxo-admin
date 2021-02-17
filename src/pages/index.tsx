import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { Button } from '@material-ui/core'
import { Container } from 'next/app'

const Home: React.FC = () => {
  const { text } = useTranslation()

  return (
    <>
      <Layout title="Dashboard">
        <Container>
          <h1>{text('about')} </h1>
          <p>{text('slogan')} </p>
          <Button color="primary" variant="contained">
            ENVIAR
          </Button>
        </Container>
      </Layout>
    </>
  )
}

export default Home
