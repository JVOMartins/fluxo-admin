import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

interface AddButtonProps {
  label: string
  onClick: (event: any) => void
}

const AddButton: React.FC<AddButtonProps> = ({
  label,
  onClick
}: AddButtonProps) => {
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  )
}

export { AddButton }
