import request from 'superagent'
import { JobData } from '../../models/job'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function addJob(data: JobData) {
  const response = await request.post(`${rootURL}/jobs`).send(data)
  return response.body as number
}
