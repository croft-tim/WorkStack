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
    <div className="flex h-full flex-col font-sans transition-colors duration-300 bg-white dark:bg-zinc-900 pink:bg-pink-50 text-zinc-900 dark:text-zinc-100 pink:text-pink-900">
      {/* Board Content */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden px-8 py-6">
        <div className="flex h-full justify-center gap-8">
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
