import useTranslation from '@contexts/Intl'
import { TextField } from '@material-ui/core'
import { IPolls } from '@services/Polls'
import { useEffect, useState } from 'react'

interface PollFormProps {
  edit?: IPolls
  isValidForm: boolean
  onChange: (event: any) => void
}

const PollsForm: React.FC<PollFormProps> = ({
  edit,
  isValidForm,
  onChange
}: PollFormProps) => {
  const { text } = useTranslation()
  const [poll, setPoll] = useState<IPolls>(edit)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    setPoll({ ...poll, [name]: value })
  }

  useEffect(() => {
    onChange(poll)
  }, [poll])

  return (
    <>
      <TextField
        name="name"
        label={`${text('labelPollName')}`}
        variant="outlined"
        value={poll?.name}
        onChange={event => handleChange(event)}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label={`${text('labelPollDescription')}`}
        variant="outlined"
        value={poll?.description}
        onChange={event => handleChange(event)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
    </>
  )
}

export { PollsForm }
