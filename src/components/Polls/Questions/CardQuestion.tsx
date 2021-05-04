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
import ShowMoreText from 'react-show-more-text'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    sumary: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    heading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      marginLeft: 16
    },
    secondaryHeading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    type: {
      whiteSpace: 'nowrap',
      fontSize: theme.typography.pxToRem(10),
      backgroundColor: '#eee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 8
    },
    questions: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: '1 1 auto',
      padding: '0 16px',
      marginBottom: 16,
      '& > div': {
        width: '100%'
      }
    },
    question: {
      wordBreak: 'break-word',
      marginRight: 16,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      lineClamp: 2,
      boxOrient: 'vertical'
    },
    showMore: {
      fontSize: 12,
      textDecoration: 'none',
      color: theme.palette.primary.main
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
        square={true}
        elevation={question.id === current ? 4 : 0}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              fontSize="small"
              onClick={() =>
                onClickToExpand(question.id === current ? null : question.id)
              }
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box className={classes.sumary}>
            <InputNumber
              number={question.position}
              min={1}
              onBlur={num => onEditPosition(question.id, num)}
            />
            <Box
              className={classes.heading}
              onClick={() =>
                onClickToExpand(question.id === current ? null : question.id)
              }
            >
              <ShowMoreText
                lines={2}
                more="ver mais"
                less="ver menos"
                anchorClass={classes.showMore}
                expanded={false}
              >
                <Typography variant="body2" className={classes.question}>
                  {question.question}
                </Typography>
              </ShowMoreText>
            </Box>
            <Box className={classes.secondaryHeading}>
              <Typography variant="caption" className={classes.type}>
                {text(question.type)}
              </Typography>
            </Box>
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
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.questions}>
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
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export { CardQuestions }
