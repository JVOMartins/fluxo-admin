import { ActionsButton } from '@components/Buttons'
import { InputNumber } from '@components/InputNumber'
import useTranslation from '@contexts/Intl'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  createStyles,
  makeStyles,
  MenuItem,
  Theme,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { IPollQuestions } from '@services/PollQuestions'
import { ReactNode } from 'react'
import { ListAnswers } from '../Answers/ListAnswers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    sumary: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '60%',
      flexShrink: 0,
      '& > span': {
        fontWeight: 700,
        marginRight: 10
      }
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(10),
      color: theme.palette.text.secondary,
      backgroundColor: '#eee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 8
    },
    questions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      width: '100%',
      '& > .options': {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 12 auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        marginRight: 8,
        padding: 8,
        height: '100%'
      },

      '& > .details': {
        width: '100%'
      }
    }
  })
)

interface CardQuestion {
  question: IPollQuestions
  current: number
  onClickToExpand: (id: number) => void
  onAddAnswer: (id: number) => void
  onFollowUp: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onEditPosition: (id: number, num) => void
  children?: ReactNode
}

const CardQuestions: React.FC<CardQuestion> = ({
  question,
  current,
  onClickToExpand,
  onAddAnswer,
  onFollowUp,
  onEdit,
  onDelete,
  onEditPosition,
  children
}: CardQuestion) => {
  const classes = useStyles()
  const { text } = useTranslation()

  return (
    <>
      <Accordion
        expanded={question.id === current}
        onChange={() =>
          onClickToExpand(question.id === current ? null : question.id)
        }
        square={true}
        elevation={question.id === current ? 1 : 0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize="small" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.sumary}
        >
          <Typography className={classes.heading}>
            <span>#{question.position}</span> {question.question}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {text(question.type)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box key={question.id} className={classes.questions}>
            <Box className="options">
              <ActionsButton tooltip={text('tooltipOptions')}>
                {question.type.includes('multiple') && (
                  <MenuItem onClick={() => onAddAnswer(question.id)}>
                    {text('btnNewResponse')}
                  </MenuItem>
                )}
                {(question.type.includes('multiple') ||
                  question.type.includes('zeroten')) && (
                  <MenuItem
                    onClick={() => {
                      onFollowUp(question.id)
                    }}
                  >
                    {text('btnNewFollowUp')}
                  </MenuItem>
                )}
                <MenuItem onClick={() => onEdit(question.id)}>
                  {text('btnEdit')}
                </MenuItem>
                <MenuItem onClick={() => onDelete(question.id)}>
                  {text('btnDelete')}
                </MenuItem>
              </ActionsButton>
              <InputNumber
                number={question.position}
                min={1}
                onBlur={num => onEditPosition(question.id, num)}
              />
            </Box>
            <Box className="details">
              <Box>
                <Typography variant="caption" className="editable">
                  {text('labelPollDescription')}: {question.description}
                </Typography>
              </Box>
              {question.type.includes('multiple') && (
                <Box>
                  <ListAnswers
                    currentQuestionAnswers={question.answers}
                    question={question}
                  />
                </Box>
              )}
              {children}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export { CardQuestions }
