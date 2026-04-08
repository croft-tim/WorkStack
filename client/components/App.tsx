import { Link } from 'react-router'

function App() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-8 text-zinc-100">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-amber-500">
        TradieFlow Project Manager
      </h1>

      <div className="flex gap-4">
        <Link to="/kanban"
          className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-zinc-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20">
          Open Kanban Board
        </Link>
      </div>
    </div>
  )
}

export default App
