import { ActionsButton } from '@components/Buttons'
import useTranslation from '@contexts/Intl'
import { Box, MenuItem, Tooltip, Typography } from '@material-ui/core'
import { IPolls } from '@services/Polls'
import styles from './TitlePoll.module.css'

interface TitlePollProps {
  poll: IPolls
  currentPoll: number
  onDuplicate: (id: number) => void
  onUpdateCode: (id: number) => void
  onUpdate: (id: number) => void
  onExportExcel: (id: number) => void
  onDelete: (id: number) => void
  onGetQrCode: (code: string) => void
  copyCode: (code: string) => void
}

const TitlePoll: React.FC<TitlePollProps> = ({
  poll,
  onDuplicate,
  onUpdateCode,
  onUpdate,
  onExportExcel,
  onDelete,
  copyCode,
  onGetQrCode
}: TitlePollProps) => {
  const { text } = useTranslation()

  return (
    <>
      <Box className={styles.content}>
        <Typography variant="h6" component="h2">
          {poll.name}
        </Typography>
        <Tooltip title={text('tooltipCopyCode')}>
          <Typography
            style={{ userSelect: 'none', cursor: 'pointer' }}
            variant="body1"
            onDoubleClick={() => copyCode(poll.code)}
          >
            {`https://enquetes.fluxo.live/${poll.code}`}
          </Typography>
        </Tooltip>
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
    </>
  )
}
export { TitlePoll }
