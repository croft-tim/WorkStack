export interface JobData {
  tradieId: number
  customerId: number
  status: JobStatus
  title: string
  quote: number
  notes: string
  startDate: string
  endDate: string
  name: string
}

export interface Job extends JobData {
  id: number
  address: string
}

export const statuses = [
  'New',
  'Quoted',
  'In Progress',
  'Invoiced',
  'Completed',
] as const

export type JobStatus = (typeof statuses)[number]
