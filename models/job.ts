export type Priority = 'High' | 'Medium' | 'Low'
export type JobStatus = 'Todo' | 'In Progress' | 'Review' | 'Done'

export interface Job {
  id: number
  title: string
  client: string
  location: string
  priority: Priority
  status: JobStatus
  dueDate: string
  description?: string
}
