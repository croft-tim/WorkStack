import db from './connection.ts'
import { Job, JobData } from '../../models/job.ts'

const selectColumns = [
  'jobs.id',
  'jobs.tradie_id as tradieId',
  'jobs.customer_id as customerId',
  'jobs.status',
  'jobs.title',
  'jobs.quote',
  'jobs.notes',
  'jobs.start_date as startDate',
  'jobs.end_date as endDate',
  'customers.address',
]

const returnColumns = [
  'id',
  'tradie_id as tradieId',
  'customer_id as customerId',
  'status',
  'title',
  'quote',
  'notes',
  'start_date as startDate',
  'end_date as endDate',
]

export async function getJobs() {
  const jobs = await db('jobs')
    .join('customers', 'jobs.customer_id', 'customers.id')
    .select(selectColumns)
  return jobs as Job[]
}

export async function getJobById(
  id: number | string,
): Promise<Job | undefined> {
  const job = await db('jobs')
    .join('customers', 'jobs.customer_id', 'customers.id')
    .select(selectColumns)
    .first()
    .where('jobs.id', id)
  return job as Job | undefined
}

export async function addJob(newJob: JobData): Promise<number> {
  const newJobArr = await db('jobs')
    .insert({
      tradie_id: newJob.tradieId,
      customer_id: newJob.customerId,
      status: newJob.status,
      title: newJob.title,
      quote: newJob.quote,
      notes: newJob.notes,
      start_date: newJob.startDate,
      end_date: newJob.endDate,
    })
    .returning(returnColumns)
  return newJobArr[0].id
}

export async function updateJobById(
  id: number,
  newProperties: Job,
): Promise<Job | undefined> {
  const updatedJobArr = await db('jobs')
    .where('id', id)
    .update({
      tradie_id: newProperties.tradieId,
      customer_id: newProperties.customerId,
      status: newProperties.status,
      title: newProperties.title,
      quote: newProperties.quote,
      notes: newProperties.notes,
      start_date: newProperties.startDate,
      end_date: newProperties.endDate,
    })
    .returning(returnColumns)
  return updatedJobArr[0]
}

export async function deleteJobById(id: number): Promise<number> {
  return db('jobs').where('id', id).delete()
}
