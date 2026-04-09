import { useQuery } from '@tanstack/react-query'
import { getJobById } from '../apis/apiClient'

export default function useJobData(id: number) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getJobById(id),
  })
}
