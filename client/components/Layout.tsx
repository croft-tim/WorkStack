import { Outlet } from 'react-router'
import Header from './Header'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './ThemeContext'

export default function Layout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col font-sans transition-colors duration-300 bg-white dark:bg-zinc-950 pink:bg-pink-50 text-zinc-900 dark:text-zinc-100 pink:text-pink-900">
        <Header />
        <main className="flex-1 overflow-hidden">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </ThemeProvider>
  )
}

