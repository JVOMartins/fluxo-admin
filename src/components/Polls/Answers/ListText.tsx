import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip
} from '@material-ui/core'
import { IPollQuestionAnswers } from '@services/PollQuestionsAnswers'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import useTranslation from '@contexts/Intl'
import React from 'react'

interface ListTextProps {
  answers: Array<IPollQuestionAnswers>
  onEdit?: (id: number) => void
  onDelete?: (pollId: number, questionId: number, id: number) => Promise<void>
}

const useStyles = makeStyles(theme => ({
  list: {
    maxWidth: 300,
    outline: 'none'
  },
  listItem: {
    cursor: 'pointer',
    borderBottom: '1px solid #eee'
  }
}))

const ListText: React.FC<ListTextProps> = ({
  answers,
  onDelete,
  onEdit
}: ListTextProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  return (
    <>
      <List dense className={classes.list}>
        {!!answers &&
          answers.map(item => (
            <React.Fragment key={item.id}>
              <Tooltip
                title={`${text('tooltipEditQuestion')}`}
                placement="top-start"
              >
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  onDoubleClick={() => {
                    onEdit(item.id)
                  }}
                >
                  <ListItemIcon>{item.position}</ListItemIcon>
                  <ListItemText
                    primary={item.value}
                    secondary={item.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={() =>
                        onDelete(item.poll_id, item.poll_question_id, item.id)
                      }
                    >
                      <DeleteOutlineOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Tooltip>
            </React.Fragment>
          ))}
      </List>
    </>
  )
}

export { ListText }
