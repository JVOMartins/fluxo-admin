import { AddButton } from '@components/Buttons'
import {
  Box,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import { getPollQuestions } from '@services/PollQuestions'
import personalStyles from '@styles/styles'
import { useEffect, useState } from 'react'
import { ListQuestions } from './ListQuestions'
import { ModalQuestions } from './ModalQuestions'

const useStyles = makeStyles(theme => ({
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

interface QuestionListProps {
  currentPoll: number
}

const QuestionList: React.FC<QuestionListProps> = ({
  currentPoll
}: QuestionListProps) => {
  const classes = useStyles()
  const [formNewQuestion, setFormNewQuestion] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('general')

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue)
  }

  return (
    <>
      <ModalQuestions
        open={formNewQuestion}
        onClose={() => setFormNewQuestion(!formNewQuestion)}
        pollId={currentPoll}
      />

      <Paper elevation={0} className={classes.contentPage}>
        <Box className={classes.titlePage}>
          <Typography variant="subtitle1">Perguntas</Typography>
          <AddButton label="Nova" onClick={() => setFormNewQuestion(true)} />
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
            <ListQuestions currentPoll={currentPoll} />
          </TabPanel>
          <TabPanel value={tab} index="individual">
            Item Two
          </TabPanel>
        </Box>
      </Paper>
    </>
  )
}

export { QuestionList }
