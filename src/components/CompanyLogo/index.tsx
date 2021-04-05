import useStyles from './styles'
import Image from 'next/image'
import useAuth from '@contexts/auth'

const CompanyLogo: React.FC = () => {
  const classes = useStyles()
  const { user } = useAuth()
  return (
    <>
      <div className={classes.logo}>
        <Image
          src={'/logos/fluxo_logo.svg'}
          alt="Logo"
          width={150}
          height={80}
          loading="eager"
        />
      </div>
    </>
  )
}

export default CompanyLogo
