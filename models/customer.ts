export interface CustomerSearch {
  id?: string
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