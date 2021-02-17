import useStyles from './styles'
import Image from 'next/image'

const CompanyLogo: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.logo}>
        <Image src="/hcgo.png" alt="Logo" width={150} height={80} />
      </div>
    </>
  )
}

export default CompanyLogo
