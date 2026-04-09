import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobData } from '../../models/job'
import { addJob } from '../apis/apiClient'

export function useAddJob() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: JobData) => addJob(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  })
}
