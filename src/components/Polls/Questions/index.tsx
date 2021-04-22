import { AddButton } from '@components/Buttons'
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
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import useTranslation from '@contexts/Intl'

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
          <Typography variant="h6" component="h4">
            <DescriptionOutlinedIcon /> {text('pageSubtitleQuestions')}
          </Typography>
          <AddButton
            label={`${text('btnNewQuestions')}`}
            onClick={() => setAddNewQuestion(true)}
            icon={<AddOutlinedIcon />}
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
            <Tab label={text('titleTabGeneral')} value="general" />
            <Tab label={text('titleTabIndividual')} value="individual" />
          </Tabs>
          <TabPanel value={tab} index="general">
            <ListQuestions
              addNewQuestion={addNewQuestion}
              closeModal={() => setAddNewQuestion(false)}
              currentPoll={currentPoll}
            />
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
