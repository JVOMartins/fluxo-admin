import axios from 'axios'

const BASE_URL = 'https://findmeapitest.herokuapp.com'

const api = axios.create({
  baseURL: BASE_URL
})

export default api

export const endpoints = {
  clients: '/clients',
  users: '/users',
  so: '/services_orders',
  auth: '/sessions'
}
