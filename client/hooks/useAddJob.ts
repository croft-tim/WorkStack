import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JobData } from '../../models/job'
import { addJob } from '../apis/apiClient'
import { useAuth0 } from '@auth0/auth0-react'

export function useAddJob() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<JobData>) => {
      let token = undefined
      if (isAuthenticated) {
        token = await getAccessTokenSilently()
      }
      return addJob(data, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  })
}
