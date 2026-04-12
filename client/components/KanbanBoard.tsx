import { statuses } from '../../models/job'
import { useJobs } from '../hooks/useJobs'
import KanbanColumn from './KanbanColumn'
import KanbanAccordion from './KanbanAccordion'

export default function KanbanBoard() {
  const { data, isPending, isError } = useJobs()
  const jobs = Array.isArray(data) ? data : []

  if (isPending) return <div className="p-8 text-zinc-400">Loading jobs...</div>
  if (isError) return <div className="p-8 text-rose-400">Failed to load jobs.</div>

  return (
    <div className="flex h-full flex-col bg-zinc-950 font-sans text-zinc-100">
      {/* Board Content */}
      <main className="flex-1 overflow-y-hidden bg-zinc-950 px-8 py-6">

        {/* Desktop: Kanban columns — hidden on mobile */}
        <div className="hidden md:flex h-full gap-6">
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              jobs={jobs.filter((job) => job.status === status)}
            />
          ))}
        </div>

        {/* Mobile: Tile + cards — hidden on desktop */}
        <div className="flex flex-col gap-3 md:hidden">
          <KanbanAccordion statuses={statuses} jobs={jobs} />
        </div>

      </main>
    </div>
  )
}
