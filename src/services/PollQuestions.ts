import api, { endpoints } from './api'

export const defaultPollQuestion = {
  question: '',
  description: '',
  type: '',
  position: 1
}

export interface RequestPollQuestions {
  question: string
  description: string
  type: string
  position: string
}

export interface IPollQuestions {
  id?: number
  question?: string
  description?: string
  type?: string
  position?: number
  poll_id?: number
  company_id?: number
  deleted_at?: string
  created_at?: string
  updated_at?: string
}

export async function getPollQuestions(
  pollId: number
): Promise<Array<IPollQuestions>> {
  const res = await api.get(`${endpoints.polls}/${pollId}/questions`)
  return res.data
}

export async function createPollQuestions(
  pollId: number,
  data: IPollQuestions
): Promise<IPollQuestions> {
  const res = await api.post(`${endpoints.polls}/${pollId}/questions`, data)
  return res.data
}

export async function updatePollQuestions(
  pollId: number,
  id: number,
  data: IPollQuestions
): Promise<IPollQuestions> {
  const res = await api.put(
    `${endpoints.polls}/${pollId}/questions/${id}`,
    data
  )
  return res.data
}

export async function deletePoll(id: number): Promise<IPollQuestions> {
  const res = await api.delete(`${endpoints.polls}/${id}`)
  return res.data
}
