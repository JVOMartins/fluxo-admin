import {
  createStyles,
  IconButton,
  makeStyles,
  Tooltip,
  Theme,
  GridList,
  GridListTile,
  GridListTileBar
} from '@material-ui/core'
import { IPollQuestionAnswers } from '@services/PollQuestionsAnswers'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import useTranslation from '@contexts/Intl'
import React from 'react'
import personalStyles from '@styles/styles'

interface ListImageProps {
  answers: Array<IPollQuestionAnswers>
  onEdit?: (id: number) => void
  onDelete?: (pollId: number, questionId: number, id: number) => Promise<void>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: '100%'
    },
    icon: {
      color: personalStyles.colors.white80
    }
  })
)

const ListImage: React.FC<ListImageProps> = ({
  answers,
  onDelete,
  onEdit
}: ListImageProps) => {
  const classes = useStyles()
  const { text } = useTranslation()
  return (
    <>
      <GridList
        cellHeight={150}
        cols={answers.length}
        className={classes.gridList}
      >
        {answers.map(item => (
          <Tooltip
            title={`${text('tooltipEditQuestion')}`}
            placement="top-start"
            key={item.id}
          >
            <GridListTile>
              <img
                src={item.value}
                alt={item.description}
                onDoubleClick={() => {
                  onEdit(item.id)
                }}
              />
              <GridListTileBar
                title={item.description}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    onClick={() =>
                      onDelete(item.poll_id, item.poll_question_id, item.id)
                    }
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          </Tooltip>
        ))}
      </GridList>
    </>
  )
}

export { ListImage }
