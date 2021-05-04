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
import { CardPoll } from '@components/Polls/CardPoll'
import { LoadingDiv } from '@components/LoadingDiv'

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
    justifyContent: 'flex-start',
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
    width: '25%',
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
    width: '75%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 16,
      width: '100%'
    }
  }
}))

const Polls: NextPage = () => {
  const { text } = useTranslation()
  const classes = useStyles()
  const [toast, setToast] = useState<ToastProps>(defaultToast)
  const [currentPoll, setCurrentPoll] = useState<number | null>()
  const [polls, setPolls] = useState<Array<IPolls>>([])
  const [currentEditPoll, setCurrentEditPoll] = useState<IPolls>(defaultPoll)
  const [formNewPoll, setFormNewOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentQrCodePoll, setCurrentQrCodePoll] = useState<string>('')

  const getAllPolls = async () => {
    setLoading(true)
    const polls = await getPolls()
    setPolls(polls)
    setLoading(false)
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
          setCurrentPoll(null)
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

  const copyToClipBoard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(`https://enquetes.fluxo.live/${code}`)
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
            <AddButton
              label={text('btnNewPolls')}
              icon={<AddOutlinedIcon />}
              onClick={() => handleNew()}
            />
          </Box>
          {loading && <LoadingDiv />}
          {!loading && polls.length === 0 && (
            <Typography>{text('registersEmpty')}</Typography>
          )}
          <Box className={classes.list}>
            <Box className={classes.left}>
              {!!polls &&
                polls.map(poll => (
                  <CardPoll
                    poll={poll}
                    currentPoll={currentPoll}
                    setCurrent={id => setCurrentPoll(id)}
                    copyCode={code => copyToClipBoard(code)}
                    onGetQrCode={code =>
                      setCurrentQrCodePoll(
                        `https://enquetes.fluxo.live/${code}`
                      )
                    }
                    onUpdateCode={id => handleUpdateCode(id)}
                    onExportExcel={id => handleUpdateCode(id)}
                    onDuplicate={id => handleDuplicate(id)}
                    onUpdate={id => handleUpdate(id)}
                    onDelete={id => handleDelete(id)}
                  />
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
