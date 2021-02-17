import Image from 'next/image'
import useStyles from './styles'

const Login: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <div className={classes.square}>
          <div className={classes.left}>
            <Image src="/logos/fluxo_icon.svg" width={50} height={50} />
          </div>
          <div className={classes.right}>
            <form action="" className="log-in" autoComplete="off">
              <h4>
                We are <span>NUVA</span>
              </h4>
              <p>
                Welcome back! Log in to your account to view today's clients:
              </p>
              <div className="floating-label">
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                />
                <label htmlFor="email">Email:</label>
              </div>
              <div className="floating-label">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                />
                <label htmlFor="password">Password:</label>
              </div>
              <button type="submit">Log in</button>
              <a
                href="https://codepen.io/elujambio/pen/YLMVed"
                className="discrete"
                target="_blank"
              >
                Advanced version
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
