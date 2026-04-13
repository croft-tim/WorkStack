import { Link } from 'react-router'

export default function App() {

  return (
    <div className="relative flex h-full flex-col items-center justify-center p-8 transition-colors duration-300">
      <h1 className="relative z-10 mb-8 text-4xl font-extrabold tracking-tight text-amber-500 pink:text-pink-600">
        WorkStack
      </h1>
      <div className="relative z-10 flex gap-4">
        <Link
          to="/kanban"
          className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-zinc-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 pink:bg-pink-500 pink:text-white pink:hover:bg-pink-400 pink:hover:shadow-pink-500/20"
        >
          Open Kanban Board
        </Link>
      </div>
    </div>
  )
}
