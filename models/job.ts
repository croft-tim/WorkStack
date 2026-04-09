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

export type JobStatus = 'New' | 'Quoted' | 'Awaiting Inspection' | 'Done'
