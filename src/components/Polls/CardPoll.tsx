import { ActionsButton } from '@components/Buttons'
import { CardItems } from '@components/CardItems'
import useTranslation from '@contexts/Intl'
import {
  Box,
  makeStyles,
  MenuItem,
  Tooltip,
  Typography
} from '@material-ui/core'
import { IPolls } from '@services/Polls'

interface CardPollProps {
  poll: IPolls
  currentPoll: number
  setCurrent: (id: number) => void
  onDuplicate: (id: number) => void
  onUpdateCode: (id: number) => void
  onUpdate: (id: number) => void
  onExportExcel: (id: number) => void
  onDelete: (id: number) => void
  onGetQrCode: (code: string) => void
  copyCode: (code: string) => void
}

const useStyles = makeStyles(() => ({
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}))

const CardPoll: React.FC<CardPollProps> = ({
  poll,
  currentPoll,
  setCurrent,
  onDuplicate,
  onUpdateCode,
  onUpdate,
  onExportExcel,
  onDelete,
  copyCode,
  onGetQrCode
}: CardPollProps) => {
  const { text } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <CardItems
        active={currentPoll === poll.id}
        onClick={() => setCurrent(poll.id)}
      >
        <Box>
          <Typography variant="body1">{poll.name}</Typography>
          <Tooltip title={text('tooltipEditQuestion')}>
            <Typography
              style={{ userSelect: 'none' }}
              variant="caption"
              onDoubleClick={event => copyCode(poll.code)}
            >
              {`https://enquetes.fluxo.live/${poll.code}`}
            </Typography>
          </Tooltip>
        </Box>
        {currentPoll === poll.id && (
          <Box className={classes.options}>
            <ActionsButton tooltip={text('tooltipOptions')}>
              <MenuItem onClick={() => onGetQrCode(poll.code)}>
                {text('btnQrCode')}
              </MenuItem>
              <MenuItem onClick={() => onDuplicate(poll.id)}>
                {text('btnDuplicate')}
              </MenuItem>
              <MenuItem onClick={() => onUpdateCode(poll.id)}>
                {text('btnUpdateCode')}
              </MenuItem>
              <MenuItem onClick={() => onExportExcel(poll.id)}>
                {text('btnExportExcel')}
              </MenuItem>
              <MenuItem onClick={() => onUpdate(poll.id)}>
                {text('btnEdit')}
              </MenuItem>
              <MenuItem onClick={() => onDelete(poll.id)}>
                {text('btnDelete')}
              </MenuItem>
            </ActionsButton>
          </Box>
        )}
      </CardItems>
    </>
  )
}
export { CardPoll }
