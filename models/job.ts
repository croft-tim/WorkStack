export type Priority = 'High' | 'Medium' | 'Low'
export type JobStatus = 'New' | 'Quoted' | 'Awaiting Inspection' | 'Done'

export interface Job {
  id: number
  customerId: number
  title: string
  problem?: string
  // location: string
  // priority: Priority
  status: JobStatus
  quote: number
  startDate: string
}

// {
//   id: 1,
//   tradie_id: 1,
//   customer_id: 1,
//   status: 'Awaiting inspection',
//   title: 'Broken Faucet',
//   problem: 'Customer states that the faucet is broken? Inspection required',
//   inspection: 'Found valve to be siezed, replacment ordered.',
//   quote: 85,
//   notes: '',
//   start_date: '2026-04-08',
//   end_date: '2026-04-12',
// }