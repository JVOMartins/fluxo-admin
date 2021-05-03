import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  MenuItem,
  Tooltip
} from '@material-ui/core'
import { IPollQuestionAnswers } from '@services/PollQuestionsAnswers'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import useTranslation from '@contexts/Intl'
import React from 'react'
import { ActionsButton } from '@components/Buttons'

interface ListTextProps {
  answers: Array<IPollQuestionAnswers>
  onEdit?: (id: number) => void
  onDelete?: (pollId: number, questionId: number, id: number) => Promise<void>
}

const useStyles = makeStyles(theme => ({
  list: {
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
            <ListItem key={item.id} className={classes.listItem}>
              <ListItemIcon>{item.position}</ListItemIcon>
              <ListItemText primary={item.value} secondary={item.description} />
              <ListItemSecondaryAction>
                <ActionsButton>
                  <MenuItem onClick={() => onEdit(item.id)}>
                    {text('btnEdit')}
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      onDelete(item.poll_id, item.poll_question_id, item.id)
                    }
                  >
                    {text('btnDelete')}
                  </MenuItem>
                </ActionsButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </>
  )
}

export { ListText }
