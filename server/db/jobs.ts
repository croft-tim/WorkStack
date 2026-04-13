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
  'customers.name',
]

export async function getJobs() {
  const jobs = await db('jobs')
    .join('customers', 'jobs.customer_id', 'customers.id')
    .select(selectColumns)
  return jobs as Job[]
}

export async function getJobsSearch(query: string) {
  const customer = await db('jobs').whereLike('title', `%${query}%`).select()
  return customer
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
    .returning('id')
  return newJobArr[0].id
}

export async function updateJobById(id: number, newProperties: Partial<Job>) {
  const updates: Record<string, unknown> = {}
  if (newProperties.tradieId !== undefined) {
    updates.tradie_id = newProperties.tradieId
  }

  if (newProperties.customerId !== undefined) {
    updates.customer_id = newProperties.customerId
  }

  if (newProperties.status !== undefined) {
    updates.status = newProperties.status
  }

  if (newProperties.title !== undefined) {
    updates.title = newProperties.title
  }

  if (newProperties.quote !== undefined) {
    updates.quote = newProperties.quote
  }

  if (newProperties.notes !== undefined) {
    updates.notes = newProperties.notes
  }

  if (newProperties.startDate !== undefined) {
    updates.start_date = newProperties.startDate
  }

  if (newProperties.endDate !== undefined) {
    updates.end_date = newProperties.endDate
  }

  const updatedJobArr = await db('jobs')
    .where('id', id)
    .update(updates)
    .returning([
      'id',
      'tradie_id as tradieId',
      'customer_id as customerId',
      'status',
      'title',
      'quote',
      'notes',
      'start_date as startDate',
      'end_date as endDate',
    ])
  return updatedJobArr[0]
}

export async function deleteJobById(id: number): Promise<number> {
  return db('jobs').where('id', id).delete()
}
