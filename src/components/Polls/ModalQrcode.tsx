import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useTranslation from '@contexts/Intl'

import QRCode from 'qrcode.react'

interface ModalQrcodeProps {
  open: boolean
  onClose: (event: any) => void
  pollAddress?: string
}

const ModalQrcode: React.FC<ModalQrcodeProps> = ({
  open,
  onClose,
  pollAddress
}: ModalQrcodeProps) => {
  const { text } = useTranslation()

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-poll"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-poll">{text('titleQrCodePolls')}</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          <QRCode value={pollAddress} renderAs="canvas" level="H" size={300} />
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button onClick={onClose} color="primary" size="small">
            {text('btnClose')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalQrcode }
