import api, { endpoints } from './api'

export const defaultPoll = {
  name: '',
  description: ''
}

export interface RequestPolls {
  name: string
  description: string
}

export interface IPolls {
  id?: string
  name: string
  description: string
  code?: string
  active?: boolean
  company_id?: number
  deleted_at?: string
  created_at?: string
  updated_at?: string
}

export async function getPolls(): Promise<Array<IPolls>> {
  const question = await api.get(`${endpoints.polls}`)
  return question.data
}
