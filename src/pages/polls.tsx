import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { NextPage } from 'next'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
import { Box, makeStyles, Paper, Tab, Tabs } from '@material-ui/core'
import { AddButton } from '@components/Buttons'
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
import { LoadingDiv } from '@components/LoadingDiv'
import { DashboardPolls, SelectPoll, TitlePoll } from '@components/Polls'
import personalStyles from '@styles/styles'
import Alert from '@material-ui/lab/Alert'

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
    alignItems: 'center',
    marginBottom: 16
  },
  details: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: personalStyles.metrics.borderRadius,
    padding: personalStyles.metrics.padding
  }
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  )
}

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
  const [tab, setTab] = useState<string>('dashboard')

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue)
  }

  const getAllPolls = async (loading = true) => {
    setLoading(loading)
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
          await getAllPolls()
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
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Isso irá Alterar o código da pesquisa e o antigo código ficará inacessível',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await updateCodePoll(id)
          await getAllPolls(false)
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
    })
  }

  const handleExport = async (id: number) => {
    try {
      //await exportll(id)
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
      await getAllPolls(false)
      setToast({
        type: 'success',
        open: true,
        message: 'Enquete duplicada com sucesso!'
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
        <Box style={{ width: '100%' }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={text('titleTabDashboard')} value="dashboard" />
            <Tab label={text('titleTabResearchs')} value="research" />
          </Tabs>
          <TabPanel value={tab} index="dashboard">
            <DashboardPolls />
          </TabPanel>
          <TabPanel value={tab} index="research">
            <Box className={classes.content}>
              <Box className={classes.buttons}>
                {polls.length > 0 && (
                  <SelectPoll
                    polls={polls}
                    onSelect={pollId => setCurrentPoll(pollId)}
                  />
                )}
                <AddButton
                  label={text('btnNewPolls')}
                  icon={<AddOutlinedIcon />}
                  onClick={() => handleNew()}
                />
              </Box>
              {loading && <LoadingDiv />}
              {!loading && polls.length === 0 && (
                <Alert severity="warning" style={{ width: '100%' }}>
                  {text('registersEmpty')}
                </Alert>
              )}

              {currentPoll && (
                <Paper elevation={1} className={classes.details}>
                  <TitlePoll
                    poll={polls.find(poll => poll.id === currentPoll)}
                    currentPoll={currentPoll}
                    copyCode={code => copyToClipBoard(code)}
                    onGetQrCode={code =>
                      setCurrentQrCodePoll(
                        `https://enquetes.fluxo.live/${code}`
                      )
                    }
                    onUpdateCode={id => handleUpdateCode(id)}
                    onExportExcel={id => handleExport(id)}
                    onDuplicate={id => handleDuplicate(id)}
                    onUpdate={id => handleUpdate(id)}
                    onDelete={id => handleDelete(id)}
                  />
                  <QuestionList currentPoll={currentPoll} />
                </Paper>
              )}
            </Box>
          </TabPanel>
        </Box>
      </Layout>
    </>
  )
}

export default withAuth(Polls)
