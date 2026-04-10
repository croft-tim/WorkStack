import { useNavigate } from 'react-router'
import CustomerForm from '../components/CustomerForm'
import { CustomerData } from '../../models/customer'
import { useAddCustomer } from '../hooks/useAddCustomer'

export default function NewCustomerPage() {
  const addCustomer = useAddCustomer()
  const navigate = useNavigate()

  const handleSubmit = async (data: CustomerData) => {
    const id = await addCustomer.mutateAsync(data)
    navigate(`/customers/${id}`)
  }

  return (
    <div>
      <h1>New Job</h1>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  )
}
