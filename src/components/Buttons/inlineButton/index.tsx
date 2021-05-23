import { Box } from '@material-ui/core'
import Link from 'next/link'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import styles from './inlineButton.module.css'

interface InlineButtonProps {
  label: string | object
  onClick: (event: any) => void
}

const InlineButton: React.FC<InlineButtonProps> = ({
  label,
  onClick
}: InlineButtonProps) => {
  return (
    <>
      <Box className={styles.wrapper}>
        <Link href="#">
          <a onClick={onClick} className={styles.link}>
            <AddOutlinedIcon />
            {label}
          </a>
        </Link>
      </Box>
    </>
  )
}

export { InlineButton }
