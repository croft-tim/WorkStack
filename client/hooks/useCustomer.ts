import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../apis/apiClient";

export function useCustomerById(id: number) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomerById(id)
  })
}