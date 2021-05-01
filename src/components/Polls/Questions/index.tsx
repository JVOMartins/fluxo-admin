import {
  Box,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import personalStyles from '@styles/styles'
import { useState } from 'react'
import { ListQuestions } from './ListQuestions'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import useTranslation from '@contexts/Intl'

const useStyles = makeStyles(theme => ({
  contentPage: {
    width: '100%',
    borderRadius: personalStyles.metrics.borderRadius,
    padding: personalStyles.metrics.padding
  },
  titlePage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: personalStyles.metrics.margin,

    '& > svg': {
      marginRight: 10
    }
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
          <Typography component="span">{children}</Typography>
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
  const { text } = useTranslation()
  const [addNewQuestion, setAddNewQuestion] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('general')

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue)
  }

  return (
    <>
      <Paper elevation={0} className={classes.contentPage}>
        <Box className={classes.titlePage}>
          <DescriptionOutlinedIcon />
          <Typography variant="h6" component="h4">
            {text('pageSubtitleQuestions')}
          </Typography>
        </Box>
        <Box>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            aria-label="tabs example"
          >
            <Tab label={text('titleTabGeneral')} value="general" />
            <Tab label={text('titleTabIndividual')} value="individual" />
            <Tab label={text('titleTabFeedback')} value="feedback" />
          </Tabs>
          <TabPanel value={tab} index="general">
            <ListQuestions currentPoll={currentPoll} />
          </TabPanel>
          <TabPanel value={tab} index="individual">
            Individual
          </TabPanel>
          <TabPanel value={tab} index="feedback">
            Feedback
          </TabPanel>
        </Box>
      </Paper>
    </>
  )
}

export { QuestionList }
