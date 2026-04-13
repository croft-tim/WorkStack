import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { Link } from 'react-router'
import Search from './SearchCard'
import { useTheme } from './ThemeContext'

interface Props {
  showToolbar?: boolean
}

const navLinks = [
  // { label: 'Dashboard', to: '/' },
  // { label: 'Board', to: '/kanban' },
  { label: 'Jobs', to: '/kanban' },
  { label: 'Customers', to: '/customers' },
  // { label: 'Costs', to: '/costs' },
  { label: 'Invoices', to: '/' },
  // { label: 'Analytics', to: '/analytics' },
]

export default function Header({ showToolbar = true }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme, setTheme } = useTheme()
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}`,
      },
    })
  }

  return (
    <div className="sticky top-0 z-50 flex flex-col border-b border-slate-200 bg-white transition-colors pink:border-pink-200 pink:bg-pink-200 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header bar */}
      <header className="flex h-16 shrink-0 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          {/* Hamburger dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex flex-col justify-center gap-1 rounded p-2 hover:bg-slate-100 focus:outline-none pink:hover:bg-pink-200 dark:hover:bg-zinc-800"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="block h-0.5 w-5 bg-slate-700 pink:bg-pink-700 dark:bg-zinc-400" />
              <span className="block h-0.5 w-5 bg-slate-700 pink:bg-pink-700 dark:bg-zinc-400" />
              <span className="block h-0.5 w-5 bg-slate-700 pink:bg-pink-700 dark:bg-zinc-400" />
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
                <nav className="absolute left-0 top-full z-50 mt-1 w-48 rounded border border-slate-200 bg-white shadow-lg pink:border-pink-200 pink:bg-pink-50 dark:border-zinc-800 dark:bg-zinc-800">
                  {navLinks.map(({ label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 pink:text-pink-800 pink:hover:bg-pink-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
            <img
              src="/workstack-logo.svg"
              alt="WorkStack"
              className="h-14 transition-all pink:hue-rotate-180 dark:brightness-125"
            />
          </Link>
        </div>

        {/* Centered Button Groups */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-12">
          {/* Jobs Group */}
          <div className="flex items-center gap-0.5">
            <Link
              to="/kanban"
              className="flex items-center rounded-l-lg bg-amber-500 px-4 py-2 text-sm font-bold text-zinc-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 pink:bg-pink-600 pink:text-white pink:hover:bg-pink-400 pink:hover:shadow-pink-500/20"
            >
              Jobs
            </Link>
            <Link
              to="/jobs/new"
              className="flex items-center rounded-r-lg bg-amber-500 px-2 py-2 text-sm font-bold text-zinc-900 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 pink:bg-pink-600 pink:text-white pink:hover:bg-pink-400 pink:hover:shadow-pink-500/20"
              aria-label="New Job"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Link>
          </div>

          {/* Customers Group */}
          <div className="flex items-center gap-0.5">
            <Link
              to="/customers"
              className="flex items-center rounded-l-lg bg-slate-500 px-4 py-2 text-sm font-bold text-zinc-900 transition-all hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-500/20 pink:bg-pink-500/90 pink:text-white pink:hover:bg-pink-500 pink:hover:shadow-pink-500/20"
            >
              Customers
            </Link>
            <Link
              to="/customers/new"
              className="flex items-center rounded-r-lg bg-slate-500 px-2 py-2 text-sm font-bold text-zinc-900 transition-all hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-500/20 pink:bg-pink-500/90 pink:text-white pink:hover:bg-pink-500 pink:hover:shadow-pink-500/20"
              aria-label="New Customer"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme('pink')}
              className={`h-10 w-16 overflow-hidden rounded border transition-opacity duration-300 ${theme === 'pink' ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                }`}
              aria-label="Pink mode"
            >
              <img
                src="/Female-tradie.png"
                alt="Pink mode"
                className="h-full w-full object-cover"
              />
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label="Toggle light/dark mode"
            >
              {theme === 'dark' ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Profile avatar placeholder */}
          {!user ? (
            <button
              onClick={handleSignIn}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                {user.given_name?.charAt(0)}
              </div>

              {/* Name */}
              <span className="text-sm font-medium text-slate-700">
                {user.given_name}
              </span>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-8 py-3 pink:border-pink-200 pink:bg-pink-600 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 pink:text-pink-300"
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
              <Search />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 pink:border-pink-700 pink:bg-pink-950/50 pink:text-pink-300 pink:hover:bg-pink-800 pink:hover:text-pink-100 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200">
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
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 pink:text-pink-200">
            <span>Sort by:</span>
            <button className="flex items-center gap-1 text-zinc-400 hover:text-amber-500 pink:text-pink-100 pink:text-zinc-600 pink:hover:text-pink-400 dark:text-zinc-300/70">
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
