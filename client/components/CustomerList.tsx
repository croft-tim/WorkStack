import CustomerCard from './CustomerCard'
import { useNavigate } from 'react-router'
import { useCustomer } from '../hooks/useCustomer'

export default function CustomerList() {
  const { isPending, isError, error, data } = useCustomer()
  const navigate = useNavigate()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="mx-auto max-w-[1600px] pt-8 px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-zinc-200 pink:text-pink-900">
          Customers
        </h1>
      </div>

      <div className="grid items-stretch gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
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
