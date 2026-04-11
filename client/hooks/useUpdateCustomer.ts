import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Customer } from '../../models/customer'
import { updateCustomerById } from '../apis/apiClient'

export function useUpdateCustomer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updatedCustomer: Customer) =>
      updateCustomerById(updatedCustomer),
    onSuccess: (updatedCustomer) => {
      queryClient.invalidateQueries({ queryKey: ['customer'] })
      queryClient.invalidateQueries({
        queryKey: ['customer', updatedCustomer.id],
      })
    },
  })
}
