import { useQuery } from '@tanstack/react-query'
import { getQueryCustomers, getQueryJobs } from '../apis/apiClient'

export function useJobSearch(query: string) {
  return useQuery({
    queryKey: ['jobsearch'],
    queryFn: () => getQueryJobs(query),
  })
}

export function useCustomerSearch(query: string) {
  return useQuery({
    queryKey: ['customersearch'],
    queryFn: () => getQueryCustomers(query),
  })
}
