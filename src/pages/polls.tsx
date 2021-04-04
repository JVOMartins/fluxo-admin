import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
import {
  Box,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import { ExportButton, AddButton, ActionsButton } from '@components/Buttons'
import { CardItems } from '@components/CardItems'
import personalStyles from '@styles/styles'
import { useEffect, useState } from 'react'
import { getPolls, IPolls } from '@services/Polls'
import { LoadingDiv } from '@components/LoadingDiv'
import { ModalPolls } from '@components/Polls/ModalPolls'
import { ModalQuestions } from '@components/Polls/ModalQuestions'

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'flex-start',
    alignItems: 'strecth',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  left: {
    display: 'flex',
    flex: '1 5 auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: personalStyles.metrics.margin,
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '100%',
      margin: 0,
      marginBottom: personalStyles.metrics.margin,
      overflow: 'auto'
    }
  },
  rigth: {
    display: 'flex',
    flex: '4 5 auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: personalStyles.metrics.padding,
    borderLeft: '1px solid #ddd',
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 auto',
      border: 0,
      paddingLeft: 0
    }
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  contentPage: {
    width: '100%',
    borderRadius: personalStyles.metrics.borderRadius,
    padding: personalStyles.metrics.padding
  },
  titlePage: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: personalStyles.metrics.margin
  }
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Home: NextPage = () => {
  const { text } = useTranslation()
  const router = useRouter()
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPoll, setCurrentPoll] = useState<string>('')
  const [polls, setPolls] = useState<Array<IPolls>>([])
  const [tab, setTab] = useState<string>('general')
  const [formNewPoll, setFormNewOpen] = useState<boolean>(false)
  const [formNewQuestion, setFormNewQuestion] = useState<boolean>(false)

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue)
  }

  const getAllPolls = async () => {
    const polls = await getPolls()
    setPolls(polls)
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }, [currentPoll])

  useEffect(() => {
    getAllPolls()
  }, [])

  return (
    <>
      <ModalPolls
        open={formNewPoll}
        onClose={() => setFormNewOpen(!formNewPoll)}
      />

      <ModalQuestions
        open={formNewQuestion}
        onClose={() => setFormNewQuestion(!formNewQuestion)}
      />

      <Layout
        title="pageTitlePolls"
        icon={<PollOutlinedIcon fontSize="large" />}
      >
        <Box className={classes.buttons}>
          <Box>
            <AddButton
              label={text('btnNewPolls')}
              onClick={() => setFormNewOpen(true)}
            />
          </Box>
          <Box>
            <ExportButton />
          </Box>
        </Box>
        <Box className={classes.content}>
          <Box className={classes.left}>
            {!!polls &&
              polls.map(poll => (
                <CardItems
                  active={currentPoll === poll.id}
                  onClick={() => setCurrentPoll(poll.id)}
                  key={poll.id}
                >
                  <Box>
                    <Typography variant="body1">{poll.name}</Typography>
                    <Typography variant="caption">
                      https://enquetes.fluxo.live/{poll.code}
                    </Typography>
                  </Box>
                  <Box className={classes.options}>
                    <ActionsButton />
                  </Box>
                </CardItems>
              ))}
          </Box>
          <Box className={classes.rigth}>
            {loading ? (
              <LoadingDiv />
            ) : (
              <Paper elevation={0} className={classes.contentPage}>
                <Box className={classes.titlePage}>
                  <Typography variant="subtitle1">Perguntas</Typography>
                  <AddButton
                    label="Nova"
                    onClick={() => setFormNewQuestion(true)}
                  />
                </Box>
                <Box>
                  <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tabs example"
                  >
                    <Tab label="Geral" value="general" />
                    <Tab label="Individual" value="individual" />
                  </Tabs>
                  <TabPanel value={tab} index="general">
                    Item One
                  </TabPanel>
                  <TabPanel value={tab} index="individual">
                    Item Two
                  </TabPanel>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default Home
