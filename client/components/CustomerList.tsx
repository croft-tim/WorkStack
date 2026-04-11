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

        <button
          type="button"
          onClick={() => navigate('/customers/new')}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-amber-400 pink:bg-pink-500 pink:hover:bg-pink-400"
        >
          Add customer
        </button>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-5">
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
