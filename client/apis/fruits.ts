import request from 'superagent'
import { Job, JobData } from '../../models/job.ts'
import { Customer, CustomerData } from '../../models/customer.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getFruits(): Promise<string[]> {
  const response = await request.get(`${rootURL}/fruits`)
  return response.body.fruits as string[]
}
