import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationFunction, useQuery } from '@tanstack/react-query'

import * as API from '../apis/apiClient'

export function useJobs(id: number) {
  const query = useQuery({
    queryKey: ['jobs'],
    queryFn: () => API.getJobById(id),
  })

  return {
    ...query,
    add: useAddJob(),
    delete: useDeleteJob(),
    update: useUpdateJob(),
  }
}

export function useJobMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
  })

  return mutation
}

export function useAddJob() {
  return useJobMutation(API.addJob)
}

export function useDeleteJob() {
  return useJobMutation(API.deleteJobById)
}

export function useUpdateJob() {
  return useJobMutation(API.updateJobById)
}
