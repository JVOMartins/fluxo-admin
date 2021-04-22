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
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined'
import useTranslation from '@contexts/Intl'
import React from 'react'
import personalStyles from '@styles/styles'

interface SelectImageProps {
  answers: Array<IPollQuestionAnswers>
  selected: string | number
  onSelect: (id: any) => void
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

const SelectImage: React.FC<SelectImageProps> = ({
  answers,
  selected,
  onSelect
}: SelectImageProps) => {
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
          <GridListTile>
            <img
              src={item.value}
              alt={item.description}
              onClick={() => {
                onSelect(item.id)
              }}
            />
            <GridListTileBar
              title={item.description}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={() => {
                    onSelect(item.id)
                  }}
                >
                  {selected === item.id ? (
                    <RadioButtonCheckedOutlinedIcon />
                  ) : (
                    <RadioButtonUncheckedOutlinedIcon />
                  )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  )
}

export { SelectImage }
