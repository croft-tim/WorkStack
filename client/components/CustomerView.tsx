import { useParams } from "react-router";
import { useCustomerById } from "../hooks/useCustomer";
import { VscStarEmpty } from "react-icons/vsc";

export default function CustomerView() {
  const { id } = useParams()
  const { data: customer, isPending, isError, error } = useCustomerById(Number(id))

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="min-h-screen p-8">
      <div className="p-8 mx-auto max-w-2xl mt-5 rounded-lg border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-amber-500">
            {customer.name}
          </h3>
          <span className="flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {customer.rating}
          </span>
        </div>

        <div className="mt-2 flex flex-col mt-5 gap-2 border-t border-zinc-800 pt-3">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {customer.address}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {customer.email}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {customer.phone}
          </div>
          {customer.notes && (
            <p className="mt-6 text-[13px] text-zinc-400 italic">{customer.notes}</p>
          )}
        </div>
      </div>
    </div>
  )
}