import db from './connection.ts'
import { Job, JobData } from '../../models/job.ts'

const columns = ['id', 'tradie_id as tradieId', 'customer_id as customerId', 'status', 'title', 'quote', 'notes', 'start_date as startDate', 'end_date as endDate']

export async function getJobs() {
  const jobs = await db('jobs').select(columns)
  return jobs as Job[]
}

export async function getJobById(id: number | string) {
  const job = await db('job').select(columns).first().where({ id })
  return job as Job
}

export async function addJob(newJob: JobData): Promise <Job> {
  const newJobArr = await db('job').insert({
    tradie_id: newJob.tradieId,
    constumer_id: newJob.customerId,
    status: newJob.status,
    title: newJob.title,
    quote: newJob.quote,
    notes: newJob.notes,
    start_date: newJob.startDate,
    end_date: newJob.endDate
  })
    .returning(columns)
  return newJobArr[0] 
}

export async function updateJobById(id: number, newProperties: Job): Promise<Job> {
  const updatedBirdArr = await db('job')
    .where('id', id)
    .update({...newProperties})
    .returning(columns)
  return updatedBirdArr[0]
}

export async function deleteJobById(id: number): Promise<number[]> {
  return db('job')
    .where('id', id)
    .delete()
}