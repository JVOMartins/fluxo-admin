import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { NextPage } from 'next'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import {
  Box,
  makeStyles,
  MenuItem,
  Tooltip,
  Typography
} from '@material-ui/core'
import { AddButton, ActionsButton } from '@components/Buttons'
import { CardItems } from '@components/CardItems'
import { useEffect, useState } from 'react'
import {
  defaultPoll,
  deletePoll,
  getPolls,
  IPolls,
  updateCodePoll,
  duplicatePoll
} from '@services/Polls'
import { ModalPolls } from '@components/Polls/ModalPolls'
import withAuth from '@utils/withAuth'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import Swal from 'sweetalert2'
import { QuestionList } from '@components/Polls/Questions'
import { ModalQrcode } from '@components/Polls/ModalQrcode'

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  list: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 16,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: 'auto'
    }
  },
  left: {
    display: 'flex',
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 16,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      marginBottom: 16,
      width: '100%',
      overflowScrolling: 'touch'
    }
  },
  right: {
    display: 'flex',
    width: '70%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 16,
      width: '100%'
    }
  },
  options: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}))

const Polls: NextPage = () => {
  const { text } = useTranslation()
  const classes = useStyles()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [currentPoll, setCurrentPoll] = useState<number>()
  const [polls, setPolls] = useState<Array<IPolls>>([])
  const [currentEditPoll, setCurrentEditPoll] = useState<IPolls>(defaultPoll)
  const [formNewPoll, setFormNewOpen] = useState<boolean>(false)
  const [currentQrCodePoll, setCurrentQrCodePoll] = useState<string>('')

  const getAllPolls = async () => {
    const polls = await getPolls()
    setPolls(polls)
  }

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Isso irá excluir o item e seus registros',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await deletePoll(id)
          getAllPolls()
          setToast({
            type: 'success',
            open: true,
            message: 'Excluído com sucesso!'
          })
        } catch (error) {
          setToast({
            type: 'error',
            open: true,
            message: error.message
          })
        }
      }
    })
  }

  const handleUpdate = async (id: number) => {
    const current = polls.find(item => item.id === id)
    setCurrentEditPoll(current)
    setFormNewOpen(true)
  }

  const handleUpdateCode = async (id: number) => {
    try {
      await updateCodePoll(id)
      getAllPolls()
      setToast({
        type: 'success',
        open: true,
        message: 'Código atualizado com sucesso!'
      })
    } catch (error) {
      setToast({
        type: 'error',
        open: true,
        message: error.message
      })
    }
  }

  const handleDuplicate = async (id: number) => {
    try {
      await duplicatePoll(id)
      getAllPolls()
      setToast({
        type: 'success',
        open: true,
        message: 'Código atualizado com sucesso!'
      })
    } catch (error) {
      setToast({
        type: 'error',
        open: true,
        message: error.message
      })
    }
  }

  const handleNew = async () => {
    setCurrentEditPoll(defaultPoll)
    setFormNewOpen(true)
  }

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      setToast({
        type: 'success',
        open: true,
        message: 'Endereço copiado'
      })
    } catch (err) {
      setToast({
        type: 'error',
        open: true,
        message: 'Falha ao copiar texto'
      })
    }
  }

  useEffect(() => {
    if (!formNewPoll) getAllPolls()
  }, [formNewPoll])

  return (
    <>
      <ToastFloat
        open={toast.open}
        onClose={() => setToast({ open: false })}
        type={toast.type}
        message={toast.message}
      />

      <ModalPolls
        open={formNewPoll}
        currentEditPoll={currentEditPoll}
        onClose={() => {
          setFormNewOpen(!formNewPoll)
        }}
      />

      <ModalQrcode
        open={!!currentQrCodePoll}
        pollAddress={currentQrCodePoll}
        onClose={() => {
          setCurrentQrCodePoll('')
        }}
      />

      <Layout
        title="pageTitlePolls"
        icon={<PollOutlinedIcon fontSize="large" />}
      >
        <Box className={classes.content}>
          <Box className={classes.buttons}>
            <Box>
              <AddButton
                label={text('btnNewPolls')}
                icon={<AddOutlinedIcon />}
                onClick={() => handleNew()}
              />
            </Box>
            <Box>
              <ActionsButton
                icon={<ImportExportIcon />}
                tooltip={text('tooltipExport')}
              >
                <MenuItem>Excel</MenuItem>
              </ActionsButton>
            </Box>
          </Box>
          {polls.length === 0 && 'Sem enquetes cadastradas'}
          <Box className={classes.list}>
            <Box className={classes.left}>
              {!!polls &&
                polls.map(poll => (
                  <CardItems
                    active={currentPoll === poll.id}
                    onClick={() => setCurrentPoll(poll.id)}
                    key={poll.id}
                  >
                    <Box>
                      <Typography variant="body1">{poll.name}</Typography>
                      <Tooltip title={text('tooltipEditQuestion')}>
                        <Typography
                          variant="caption"
                          onDoubleClick={() =>
                            copyToClipBoard(
                              `https://enquetes.fluxo.live/${poll.code}`
                            )
                          }
                        >
                          {`https://enquetes.fluxo.live/${poll.code}`}
                        </Typography>
                      </Tooltip>
                    </Box>
                    {currentPoll === poll.id && (
                      <Box className={classes.options}>
                        <ActionsButton tooltip={text('tooltipOptions')}>
                          <MenuItem
                            onClick={() =>
                              setCurrentQrCodePoll(
                                `https://enquetes.fluxo.live/${poll.code}`
                              )
                            }
                          >
                            {text('btnQrCode')}
                          </MenuItem>
                          <MenuItem onClick={() => handleDuplicate(poll.id)}>
                            {text('btnDuplicate')}
                          </MenuItem>
                          <MenuItem onClick={() => handleUpdateCode(poll.id)}>
                            {text('btnUpdateCode')}
                          </MenuItem>
                          <MenuItem onClick={() => handleUpdate(poll.id)}>
                            {text('btnEdit')}
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(poll.id)}>
                            {text('btnDelete')}
                          </MenuItem>
                        </ActionsButton>
                      </Box>
                    )}
                  </CardItems>
                ))}
            </Box>
            {currentPoll && (
              <Box className={classes.right}>
                <QuestionList currentPoll={currentPoll} />
              </Box>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default withAuth(Polls)
