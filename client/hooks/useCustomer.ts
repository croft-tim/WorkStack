import { useQuery } from "@tanstack/react-query";
import { getCustomerById, getCustomers } from "../apis/apiClient";

export function useCustomerById(id: number) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomerById(id)
  })
}

export function useCustomer() {
  return useQuery({
    queryKey: ['customer'],
    queryFn: () => getCustomers()
  })
}