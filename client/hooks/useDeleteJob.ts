import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteJobById } from '../apis/apiClient'

export function useDeleteJob() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteJobById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  })
}
