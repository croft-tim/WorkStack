import { useState } from 'react'
import { Link } from 'react-router'

interface Props {
  showToolbar?: boolean
}

const navLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Board', to: '/kanban' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Clients', to: '/clients' },
  { label: 'Costs', to: '/costs' },
  { label: 'Invoices', to: '/invoices' },
  { label: 'Analytics', to: '/analytics' },
]

export default function Header({ showToolbar = true }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col border-b border-slate-200 bg-white">
      {/* Header bar */}
      <header className="flex h-16 shrink-0 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          {/* Hamburger dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex flex-col justify-center gap-1 rounded p-2 hover:bg-slate-100 focus:outline-none"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="block h-0.5 w-5 bg-slate-700" />
              <span className="block h-0.5 w-5 bg-slate-700" />
              <span className="block h-0.5 w-5 bg-slate-700" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  role="button"
                  tabIndex={-1}
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  onKeyDown={() => setMenuOpen(false)}
                />
                <nav className="absolute left-0 top-full z-50 mt-1 w-48 rounded border border-slate-200 bg-white shadow-lg">
                  {navLinks.map(({ label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </>
            )}
          </div>

          {/* SVG logo */}
          <Link to="/">
            <img src="/workstack-logo.svg" alt="WorkStack" className="h-14" />
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-amber-400">
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
          <button className="rounded-lg bg-slate-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-600">
            Clients
          </button>

          {/* Profile avatar placeholder */}
          <button
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-200 transition-shadow hover:ring-2 hover:ring-amber-400 focus:outline-none"
            aria-label="View profile"
          >
            <svg
              className="h-6 w-6 text-slate-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-8 py-3">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
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
