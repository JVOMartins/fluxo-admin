import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'http://127.0.0.1:3333/api/v1'

const api = axios.create({
  baseURL: BASE_URL
})

const storageToken = Cookies.get('AuthFluxo_token')
if (storageToken) {
  api.defaults.headers['Authorization'] = `Bearer ${storageToken}`
}

export default api

export const endpoints = {
  auth: '/sessions',
  polls: '/polls'
}
