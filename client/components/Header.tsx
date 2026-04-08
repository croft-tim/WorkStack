import { useState } from 'react'
import { Link } from 'react-router'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-200 relative">
      {/* Hamburger dropdown nav */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex flex-col justify-center gap-1 p-2 rounded hover:bg-slate-100 focus:outline-none"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-slate-700" />
          <span className="block w-5 h-0.5 bg-slate-700" />
          <span className="block w-5 h-0.5 bg-slate-700" />
        </button>

        {menuOpen && (
          <>
            {/* Backdrop to close menu when clicking outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <nav className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded shadow-lg z-50">
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-slate-100 text-sm text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/jobs"
                className="block px-4 py-2 hover:bg-slate-100 text-sm text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/clients"
                className="block px-4 py-2 hover:bg-slate-100 text-sm text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                Clients
              </Link>
              <Link
                to="/costs"
                className="block px-4 py-2 hover:bg-slate-100 text-sm text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                Costs
              </Link>
            </nav>
          </>
        )}
      </div>

      {/* App logo */}
      <Link to="/">
        <img src="/workstack-logo.svg" alt="WorkStack" className="h-14" />
      </Link>

      {/* Action buttons */}
      <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 rounded font-semibold text-sm text-white transition-colors">
        + NEW JOB
      </button>
      <button className="px-4 py-1.5 bg-slate-500 hover:bg-slate-600 rounded font-semibold text-sm text-white transition-colors">
        CLIENTS
      </button>

      {/* Profile avatar — far right */}
      <button
        className="ml-auto w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400 focus:outline-none transition-shadow overflow-hidden"
        aria-label="View profile"
      >
        {/* Placeholder person icon — replace with <img> once profile images are available */}
        <svg
          className="w-6 h-6 text-slate-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </button>
    </header>
  )
}
