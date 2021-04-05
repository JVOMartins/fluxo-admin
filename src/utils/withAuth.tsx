import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter()

    useEffect(() => {
      const token = Cookies.get('AuthFluxo_token')
      if (!token) router.replace('/login')
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
