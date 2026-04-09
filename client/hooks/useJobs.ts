import { useQuery } from '@tanstack/react-query'
import { getJobs } from '../apis/apiClient'

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })
}
