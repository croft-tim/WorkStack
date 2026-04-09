import { useQuery } from '@tanstack/react-query'

import { Job } from '../../models/job'

const rootURL = new URL('/api/v1', document.baseURI)

export default function useJobData(id: number) {
  return useQuery({
    queryKey: ['job'],
    queryFn: getJobById,
  })
}
