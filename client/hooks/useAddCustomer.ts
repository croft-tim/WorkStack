import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomerData } from '../../models/customer'
import { addCustomer } from '../apis/apiClient'

export function useAddCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CustomerData) => addCustomer(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customer'] }),
  })
}
