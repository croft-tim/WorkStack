import CustomerCard from './CustomerCard'
import { useNavigate } from 'react-router'
import { useCustomer } from '../hooks/useCustomer'

export default function CustomerList() {
  const { isPending, isError, error, data } = useCustomer()
  const navigate = useNavigate()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="mx-auto max-w-[1600px] pt-8">
      <div className="grid grid-cols-1 gap-4 items-stretch md:grid-cols-2 lg:grid-cols-5">
        {data.map((customer) => (
          <button
            key={customer.id}
            type="button"
            onClick={() => navigate(`/customer/${customer.id}`)}
            className="w-full text-left"
          >
            <CustomerCard customer={customer} />
          </button>
        ))}
      </div>
    </div>
  )

}

// return (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//     {data.map((customer) => (
//       <CustomerCard key={customer.id} customer={customer} onClick={() => navigate(`/customer/${customer.id}`)} />
//     ))}
//     {/* <CustomerCard key={mockCustomer[0].id} customer={mockCustomer[0]} /> */}
//   </div>
// )