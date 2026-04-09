export interface JobData {
  tradieId: number
  customerId: number
  status: JobStatus
  title: string
  quote: number
  notes: string
  startDate: string
  endDate: string
}

export interface Job extends JobData {
  id: number
}

export const statuses = [
  'New',
  'Quoted',
  'In Progress',
  'Invoiced',
  'Completed',
] as const

export type JobStatus = (typeof statuses)[number]
