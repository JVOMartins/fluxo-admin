import useStyles from './styles'
import useAuth from '@contexts/auth'

const CompanyLogo: React.FC = () => {
  const classes = useStyles()
  const { user } = useAuth()
  return (
    <>
      <div className={classes.logo}>
        <img src={user?.company.logo || '/logos/fluxo_logo.svg'} alt="Logo" />
      </div>
    </>
  )
}

export default CompanyLogo
