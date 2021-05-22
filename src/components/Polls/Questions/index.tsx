import { Box, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react'
import { ListQuestions } from './ListQuestions'
import useTranslation from '@contexts/Intl'
import { ResponsesPolls } from '../Responses'

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
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  )
}

interface QuestionListProps {
  currentPoll: number
}

const QuestionList: React.FC<QuestionListProps> = ({
  currentPoll
}: QuestionListProps) => {
  const { text } = useTranslation()
  const [tab, setTab] = useState<string>('questions')

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue)
  }

  return (
    <>
      <Box style={{ width: '100%' }}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={text('titleTabQuestions')} value="questions" />
          <Tab label={text('titleTabResponses')} value="responses" />
          <Tab label={text('titleTabIndividual')} value="individual" />
          <Tab label={text('titleTabFeedback')} value="feedback" />
        </Tabs>
        <TabPanel value={tab} index="questions">
          <ListQuestions currentPoll={currentPoll} />
        </TabPanel>
        <TabPanel value={tab} index="responses">
          <ResponsesPolls currentPoll={currentPoll} />
        </TabPanel>
        <TabPanel value={tab} index="individual">
          Individual
        </TabPanel>
        <TabPanel value={tab} index="feedback">
          Feedback
        </TabPanel>
      </Box>
    </>
  )
}

export { QuestionList }
