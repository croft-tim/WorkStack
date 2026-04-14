import { useNavigate, useParams } from 'react-router'
import CustomerForm from './CustomerForm'
import { CustomerData } from '../../models/customer'
import { useCustomerById } from '../hooks/useCustomer'
import { useUpdateCustomer } from '../hooks/useUpdateCustomer'

export default function EditCustomerPage() {
  const { id } = useParams()
  const customerId = Number(id)

  const navigate = useNavigate()
  const updateCustomer = useUpdateCustomer()
  const {
    data: customer,
    isPending,
    isError,
    error,
  } = useCustomerById(customerId)

  if (isPending) return <p className="p-8 text-slate-400 dark:text-zinc-400 pink:text-pink-400">Loading...</p>
  if (isError) return <p className="p-8 text-rose-500 dark:text-rose-400 pink:text-rose-500">Error: {error.message}</p>
  if (!customer) return <p className="p-8 text-slate-500 dark:text-zinc-400 pink:text-pink-500">Customer not found</p>

  const handleSubmit = async (data: CustomerData) => {
    await updateCustomer.mutateAsync({
      ...data,
      id: customer.id,
    })
    navigate(`/customer/${customer.id}`)
  }

  return (
    <CustomerForm
      initialData={customer}
      onSubmit={handleSubmit}
      onCancel={() => navigate(`/customer/${customer.id}`)}
    />
  )
}
