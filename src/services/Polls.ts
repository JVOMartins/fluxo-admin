import api, { endpoints } from './api'
import { IPollQuestions } from './PollQuestions'

export const defaultPoll = {
  name: '',
  description: ''
}

export interface RequestPolls {
  name: string
  description: string
}

export interface IPolls {
  id?: number
  name: string
  description: string
  code?: string
  active?: boolean
  questions?: Array<IPollQuestions>
  company_id?: number
  deleted_at?: string
  created_at?: string
  updated_at?: string
}

export async function getPolls(): Promise<Array<IPolls>> {
  const res = await api.get(`${endpoints.polls}`)
  return res.data
}

export async function createPolls(data: IPolls): Promise<IPolls> {
  const res = await api.post(`${endpoints.polls}`, data)
  return res.data
}

export async function updatePoll(id: number, data: IPolls): Promise<IPolls> {
  const res = await api.put(`${endpoints.polls}/${id}`, data)
  return res.data
}

export async function updateCodePoll(id: number): Promise<IPolls> {
  const res = await api.get(`${endpoints.polls}/${id}/update_code`)
  return res.data
}

export async function duplicatePoll(id: number): Promise<IPolls> {
  const res = await api.get(`${endpoints.polls}/${id}/duplicate`)
  return res.data
}

export async function deletePoll(id: number): Promise<IPolls> {
  const res = await api.delete(`${endpoints.polls}/${id}?force=true`)
  return res.data
}

export async function getPollResults(id: number): Promise<IPolls> {
  const res = await api.get(`${endpoints.polls}/${id}/results`)
  return res.data
}
