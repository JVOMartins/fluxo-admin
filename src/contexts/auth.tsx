import React, { createContext, useState, useContext, useEffect } from 'react'

import Cookies from 'js-cookie'
import api, { endpoints } from '../lib/api'
import LoadingScreen from '../components/LoadingScreen'

interface IUser {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
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
  const [loading, setLoading] = useState(true)

  const loadStorageData = async () => {
    const token = Cookies.get('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
    setLoading(false)
  }

  const signIn = async ({ email, password }: Request) => {
    const res = await api.post(endpoints.auth, { email, password })

    if (res.data) {
      setUser(res.data.user)
      Cookies.set('token', res.data.token, { expires: 60 })
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`
    }
  }

  const signOut = () => {
    Cookies.remove('token')
    setUser(null)
    delete api.defaults.headers.Authorization
    window.location.pathname = '/login'
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

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
  const { signed, loading } = useAuth()
  if (loading || (!signed && window.location.pathname !== '/login')) {
    return <LoadingScreen show={loading} />
  }
  return children
}
