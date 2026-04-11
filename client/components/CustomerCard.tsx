import { Customer } from '../../models/customer'

interface Props {
  customer: Customer
  // onClick: () => void
}

export default function CustomerCard({ customer }: Props) {
  return (
    <button className="h-full w-full">
      <div className="group relative flex h-full w-full min-h-[120px] min-w-[260px] flex-col gap-3 rounded-lg border transition-all duration-200 border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50 pink:border-pink-200 pink:bg-pink-50 p-4 hover:shadow-lg hover:shadow-black/5 dark:hover:border-zinc-700 dark:hover:shadow-black/20 pink:hover:border-pink-300 pink:hover:shadow-pink-500/10">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold transition-colors text-slate-800 dark:text-zinc-300 pink:text-pink-900 group-hover:text-amber-500 pink:group-hover:text-pink-600">
            {customer.name}
          </h3>
          <span className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 pink:border-pink-500/20 pink:bg-pink-500/10 pink:text-pink-600">
            <svg
              className="h-3 w-3 text-zinc-500 pink:text-pink-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            {customer.rating}
          </span>
        </div>

        <div className="mt-2 flex flex-col gap-2 border-t pt-3 border-slate-100 dark:border-zinc-800 pink:border-pink-100">
          {customer.notes && (
            <p className="mt-1 text-[11px] italic text-slate-500 dark:text-zinc-400 pink:text-pink-700">
              {customer.notes}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
