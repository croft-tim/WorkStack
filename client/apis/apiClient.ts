import request from 'superagent'
import { Job, JobData } from '../../models/job.ts'
import { Customer, CustomerData } from '../../models/customer.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

// Jobs
export async function getJobs() {
  const response = await request.get(`${rootURL}/jobs`)
  return response.body as Job[]
}

//Tim here I have changed return response.body.jobs as Job[] and removed .jobs

export async function getJobById(id: number) {
  const response = await request.get(`${rootURL}/jobs/${id}`)
  return response.body as Job
}

export async function addJob(newJob: JobData) {
  const response = await request.post(`${rootURL}/jobs`).send(newJob)
  return response.body as number
}

export async function deleteJobById(id: number) {
  await request.delete(`${rootURL}/jobs/${id}`)
  return
}

export async function updateJobById(updatedJob: Job): Promise<Job> {
  const response = await request
    .patch(`${rootURL}/jobs/${updatedJob.id}`)
    .send(updatedJob)
  return response.body as Job
}

// Customers
const customerURL = `${rootURL}/customers`

export async function getCustomerById(id: number) {
  const response = await request.get(`${customerURL}/${id}`)
  return response.body as Customer
}

export async function getCustomers() {
  const response = await request.get(`${customerURL}`)
  return response.body as Customer[]
}

export async function addCustomer(newCustomer: CustomerData) {
  const response = await request.post(`${rootURL}/customers`).send(newCustomer)
  return response.body as number
}

export async function updateCustomerById(
  updatedCustomer: Customer,
): Promise<Customer> {
  const response = await request
    .patch(`${rootURL}/customers/${updatedCustomer.id}`)
    .send(updatedCustomer)
  return response.body as Customer
}

export async function getQueryJobs(query: string) {
  const response = await request.get(`${rootURL}/jobs/search/${query}`)
  return response.body as Job[]
}

export async function getQueryCustomers(query: string) {
  const response = await request.get(`${rootURL}/customers/search/${query}`)
  return response.body as Customer[]
}
