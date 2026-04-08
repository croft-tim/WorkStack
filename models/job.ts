export interface JobData {
  tradieId: number
  customerId: number
  status: string
  title: string
  quote: number
  notes: string
  startDate: string
  endDate: string
}

export interface Job extends JobData {
  id: number
}

export interface CustomerData {
  name: string
  address: string
  phone: string
  email: string
  notes: string
  rating: number
}

export interface Customer extends CustomerData {
  id: number
}
