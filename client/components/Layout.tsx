import { Outlet } from 'react-router'
import Header from './Header'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './ThemeContext'
import { useTradieLogin } from '../hooks/useTradieLogin'

export default function Layout() {
  useTradieLogin()

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 transition-colors duration-300 pink:bg-pink-50 pink:text-pink-900 dark:bg-zinc-900 dark:text-zinc-100">
        <Header />
        <main className="flex-1 overflow-hidden">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </ThemeProvider>
  )
}
