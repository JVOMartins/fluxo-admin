import useTranslation from '@contexts/Intl'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { IPolls } from '@services/Polls'
import { useState } from 'react'

import styles from './SelectPoll.module.css'

interface SelectPollProps {
  polls: Array<IPolls>
  onSelect: (pollId: number) => void
}

const SelectPoll: React.FC<SelectPollProps> = ({
  polls,
  onSelect
}: SelectPollProps) => {
  const { text } = useTranslation()

  const [pollId, setPollId] = useState<number>()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPollId(event.target.value as number)
    onSelect(event.target.value as number)
  }

  return (
    <>
      <FormControl variant="outlined" margin="dense" className={styles.content}>
        <InputLabel id="demo-simple-select-outlined-label">
          {text('selectPollLabel')}
        </InputLabel>
        <Select
          labelId="selectPoll"
          id="selectPoll"
          value={pollId || ''}
          defaultValue=""
          onChange={event => handleChange(event)}
          label={text('selectPollLabel')}
        >
          {!!polls &&
            polls.map(poll => (
              <MenuItem value={poll.id} key={poll.id}>
                {poll.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )
}

export { SelectPoll }
