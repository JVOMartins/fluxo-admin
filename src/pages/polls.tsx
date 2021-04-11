import Layout from '@components/Layout'
import useTranslation from '@contexts/Intl'
import { NextPage } from 'next'
import PollOutlinedIcon from '@material-ui/icons/PollOutlined'
import { Box, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core'
import { ExportButton, AddButton, ActionsButton } from '@components/Buttons'
import { CardItems } from '@components/CardItems'
import { useEffect, useState } from 'react'
import { defaultPoll, deletePoll, getPolls, IPolls } from '@services/Polls'
import { ModalPolls } from '@components/Polls/ModalPolls'
import withAuth from '@utils/withAuth'
import ToastFloat, { defaultToast, ToastProps } from '@components/Snackbar'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import Swal from 'sweetalert2'
import { QuestionList } from '@components/Polls/Questions'

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  const handleNew = async () => {
    setCurrentEditPoll(defaultPoll)
    setFormNewOpen(true)
  }

  useEffect(() => {
    getAllPolls()
  }, [])

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
          getAllPolls()
        }}
      />

      <Layout
        title="pageTitlePolls"
        icon={<PollOutlinedIcon fontSize="large" />}
      >
        <Grid container spacing={3}>
          <Grid item sm={12} className={classes.buttons}>
            <Box>
              <AddButton
                label={text('btnNewPolls')}
                icon={<AddOutlinedIcon />}
                onClick={() => handleNew()}
              />
            </Box>
            <Box>
              <ExportButton />
            </Box>
          </Grid>
          <Grid item sm={12} md={3}>
            {!!polls &&
              polls.map(poll => (
                <CardItems
                  active={currentPoll === poll.id}
                  onClick={() => setCurrentPoll(poll.id)}
                  key={poll.id}
                >
                  <Box>
                    <Typography variant="body1">{poll.name}</Typography>
                    <Typography variant="caption">
                      https://enquetes.fluxo.live/{poll.code}
                    </Typography>
                  </Box>
                  <Box className={classes.options}>
                    <ActionsButton>
                      <MenuItem onClick={console.log}>Baixar QRCODE</MenuItem>
                      <MenuItem onClick={console.log}>Duplicar</MenuItem>
                      <MenuItem onClick={() => handleUpdate(poll.id)}>
                        Editar
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(poll.id)}>
                        Excluir
                      </MenuItem>
                    </ActionsButton>
                  </Box>
                </CardItems>
              ))}
          </Grid>
          {currentPoll && (
            <Grid item sm={12} md={9}>
              <QuestionList currentPoll={currentPoll} />
            </Grid>
          )}
        </Grid>
      </Layout>
    </>
  )
}

export default withAuth(Polls)
