import React, { ReactNode } from 'react'
import useTranslation from '@contexts/Intl'
import { AddButton } from '@components/Buttons'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

interface ModalCustomProps {
  title: string | object
  loading: boolean
  validate: boolean
  open: boolean
  children: ReactNode
  onClose: (event: any) => void
  onSave: (event: any) => void
}

const ModalCustom: React.FC<ModalCustomProps> = ({
  title,
  open,
  children,
  loading,
  validate,
  onSave,
  onClose
}: ModalCustomProps) => {
  const { text } = useTranslation()

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-poll"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-poll">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button onClick={onClose} color="primary" size="small">
            {text('btnClose')}
          </Button>
          <AddButton
            label={text('btnSave')}
            loading={loading}
            disabled={!validate}
            onClick={onSave}
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

export { ModalCustom }
