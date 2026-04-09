import { mockCustomer } from '../data/mockCustomer'
import CustomerCard from './CustomerCard'
import { useNavigate } from 'react-router'

export default function CustomerList() {
  console.log('CustomerList: mockCustomer[0]', mockCustomer[0])
  // const { id, name } = mockCustomer[0]
  const navigate = useNavigate()
  return (
    <>
      {mockCustomer.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} onClick={() => navigate(`/customer/${customer.id}`)} />
      ))}
      {/* <CustomerCard key={mockCustomer[0].id} customer={mockCustomer[0]} /> */}
    </>
  )
}