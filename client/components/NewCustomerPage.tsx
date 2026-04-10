import { useNavigate } from 'react-router'
import CustomerForm from '../components/CustomerForm'
import { CustomerData } from '../../models/customer'
import { useAddCustomer } from '../hooks/useAddCustomer'

export default function NewCustomerPage() {
  const addCustomer = useAddCustomer()
  const navigate = useNavigate()

  const handleSubmit = async (data: CustomerData) => {
    const id = await addCustomer.mutateAsync(data)
    navigate(`/customer/${id}`)
  }

  return (
    <CustomerForm
      onSubmit={handleSubmit}
      onCancel={() => navigate('/customers')}
    />
  )
}
