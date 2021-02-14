import useStyles from './styles'

const CompanyLogo: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.logo}>Logo</div>
    </>
  )
}

export default CompanyLogo
