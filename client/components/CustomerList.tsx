import { mockCustomer } from '../data/mockCustomer'
import CustomerCard from './CustomerCard'

export default function CustomerList() {
  console.log('CustomerList: mockCustomer[0]', mockCustomer[0])
  // const { id, name } = mockCustomer[0]
  return (
    <>
      {mockCustomer.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
      {/* <CustomerCard key={mockCustomer[0].id} customer={mockCustomer[0]} /> */}
    </>
  )
}