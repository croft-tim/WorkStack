import { Link } from 'react-router'

interface Props {
  showToolbar?: boolean
}

export default function NavHeader({ showToolbar = true }: Props) {
  return (
    <div className="flex flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-900 bg-zinc-950 px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-zinc-950 transition-all group-hover:bg-amber-400">
              W
            </div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-100 transition-colors group-hover:text-amber-500">
              WorkStack
            </h1>
          </Link>
          <nav className="ml-8 hidden space-x-6 text-sm font-medium text-zinc-500 md:flex">
            <Link
              to="/kanban"
              className="text-zinc-200 transition-colors hover:text-amber-500"
            >
              Board
            </Link>
            <Link to="/" className="transition-colors hover:text-zinc-200">
              Analytics
            </Link>
            <Link to="/" className="transition-colors hover:text-zinc-200">
              Customers
            </Link>
            <Link to="/" className="transition-colors hover:text-zinc-200">
              Invoices
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-zinc-950 transition-all hover:bg-amber-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Job
          </button>
          <div className="h-8 w-8 rounded-full border border-zinc-800 bg-zinc-900 shadow-inner" />
        </div>
      </header>

      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between border-b border-zinc-900/50 bg-zinc-950 px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search jobs, clients..."
                className="w-64 rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-xs text-zinc-100 transition-colors focus:border-amber-500/50 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <span>Sort by:</span>
            <button className="flex items-center gap-1 text-zinc-200 hover:text-amber-500">
              Priority
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
