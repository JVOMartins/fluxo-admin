import React, { createContext, useContext, useEffect, useState } from 'react'
import * as auth from '@services/auth'
import api from '@services/api'
import Cookies from 'js-cookie'

interface IUser {
  id: string
  first_name: string
  type: string
  avatar?: string
  company?: { name: string; logo: string }
  created_at?: string
  updated_at?: string
}

interface AuthContextData {
  signed: boolean
  user: IUser | null
  loading: boolean
  signIn(data: Request): Promise<void>
  signOut(): void
}

interface Request {
  email: string
  password: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading] = useState(false)

  const loadStorageData = () => {
    const storageUser = window.localStorage.getItem('@AuthFluxo:user')
    const storageToken = Cookies.get('AuthFluxo_token')

    if (storageUser && storageToken) {
      api.defaults.headers['Authorization'] = `Bearer ${storageToken}`
      setUser(JSON.parse(storageUser))
    }
  }

  const signIn = async ({ email, password }: Request) => {
    const res = await auth.signIn({ email, password })
    setUser(res.user)
    api.defaults.headers['Authorization'] = `Bearer ${res.token.token}`
    window.localStorage.setItem('@AuthFluxo:user', JSON.stringify(res.user))
    Cookies.set('AuthFluxo_token', res.token.token, { expires: 7 })
  }

  const signOut = () => {
    window.localStorage.clear()
    Cookies.remove('AuthFluxo_token')
    setUser(null)
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
