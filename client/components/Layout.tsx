import { Outlet } from 'react-router'
import Header from './Header'
import NavHeader from './NavHeader'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100">
      <Header />
      <NavHeader />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
