import api, { endpoints } from './api'

export const defaultPollQuestionAnswers = {
  value: '',
  description: '',
  position: 1
}

export interface RequestPollQuestionAnswers {
  value: string
  description: string
  position: string
}

export interface IPollQuestionAnswers {
  id?: number
  value?: string
  description?: string
  position?: number
  poll_question_id?: number
  poll_id?: number
  company_id?: number
  deleted_at?: string
  created_at?: string
  updated_at?: string
}

export async function getPollQuestionAnswers(
  pollId: number,
  questionId: number
): Promise<Array<IPollQuestionAnswers>> {
  const res = await api.get(
    `${endpoints.polls}/${pollId}/questions/${questionId}/answers`
  )
  return res.data
}

export async function createPollQuestionAnswers(
  pollId: number,
  questionId: number,
  data: IPollQuestionAnswers
): Promise<IPollQuestionAnswers> {
  const res = await api.post(
    `${endpoints.polls}/${pollId}/questions/${questionId}/answers`,
    data
  )
  return res.data
}

export async function createPollQuestionAnswersImage(
  pollId: number,
  questionId: number,
  data: FormData
): Promise<IPollQuestionAnswers> {
  const res = await api.post(
    `${endpoints.polls}/${pollId}/questions/${questionId}/answers`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return res.data
}

export async function updatePollQuestionAnswers(
  pollId: number,
  questionId: number,
  id: number,
  data: IPollQuestionAnswers
): Promise<IPollQuestionAnswers> {
  const res = await api.put(
    `${endpoints.polls}/${pollId}/questions/${questionId}/answers/${id}`,
    data
  )
  return res.data
}

export async function deletePollQuestionAnswers(
  pollId: number,
  questionId: number,
  id: number
): Promise<IPollQuestionAnswers> {
  const res = await api.delete(
    `${endpoints.polls}/${pollId}/questions/${questionId}/answers/${id}?force=true`
  )
  return res.data
}
