import request from 'superagent'
import { Customer } from '../../models/customer.ts'
// import { Job, JobData } from '../../models/job.ts'

const baseURL = new URL('/api/v1/customer', document.baseURI)

export async function getCustomerById(id: number) {
  const url = `${baseURL}/${id}`
  const res = await request.get(url)
  return res.body as Customer
}

// export async function getJobs() {
//   const response = await request.get(`${rootURL}/jobs`)
//   return response.body.jobs as Job[]
// }

// export async function getJobById(id: number) {
//   const response = await request.get(`${rootURL}/jobs/${id}`)
//   return response.body as Job
// }

// export async function addJob(newJob: JobData) {
//   const response = await request.post(`${rootURL}/jobs`).send(newJob)
//   return response.body as Job
// }

// export async function deleteJobById(id: number) {
//   await request.delete(`${rootURL}/jobs/${id}`)
//   return
// }

// export async function updateJobById(updatedJob: Job): Promise<Job> {
//   const response = await request
//     .patch(`${rootURL}/jobs/${updatedJob.id}`)
//     .send(updatedJob)
//   return response.body as Job
// }
