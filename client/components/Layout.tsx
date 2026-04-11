import { Outlet } from 'react-router'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />
      <main className="flex-1 overflow-hidden bg-zinc-950">
        <Outlet />
        <Toaster />
      </main>
    </div>
  )
}
