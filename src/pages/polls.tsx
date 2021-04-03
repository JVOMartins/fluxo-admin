import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
import { Box, makeStyles } from '@material-ui/core'

import { ExportButton, AddButton } from '@components/Buttons'

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  }
}))

const Home: NextPage = () => {
  const { text } = useTranslation()
  const router = useRouter()
  const classes = useStyles()

  return (
    <>
      <Layout
        title="pageTitlePolls"
        icon={<PollOutlinedIcon fontSize="large" />}
      >
        <Box className={classes.buttons}>
          <Box>
            <AddButton label="nova enquete" onClick={console.log} />
          </Box>
          <Box>
            <ExportButton />
          </Box>
        </Box>
        <Box>
          <Box>Direita</Box>
          <Box>Esquerda</Box>
        </Box>
      </Layout>
    </>
  )
}

export default Home
