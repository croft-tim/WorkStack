import { useState } from 'react'
import { statuses } from '../../models/job'
import { useJobs } from '../hooks/useJobs'
import { useWindowWidth } from '../hooks/useWindowWidth'
import KanbanColumn from './KanbanColumn'
import KanbanAccordion from './KanbanAccordion'

function getVisibleCount(width: number): number {
  if (width >= 1100) return 5
  if (width >= 900) return 4
  if (width >= 700) return 3
  if (width >= 500) return 2
  return 1
}

export default function KanbanBoard() {
  const { data, isPending, isError } = useJobs()
  const jobs = Array.isArray(data) ? data : []
  const width = useWindowWidth()
  const visibleCount = getVisibleCount(width)
  const [startIndex, setStartIndex] = useState(0)

  if (isPending) return <div className="p-8 text-zinc-400">Loading jobs...</div>
  if (isError) return <div className="p-8 text-rose-400">Failed to load jobs.</div>

  const visibleStatuses = statuses.slice(startIndex, startIndex + visibleCount)
  const canGoLeft = startIndex > 0
  const canGoRight = startIndex + visibleCount < statuses.length

  return (
    <div className="flex h-full flex-col font-sans transition-colors duration-300 bg-white dark:bg-zinc-900 pink:bg-pink-50 text-zinc-900 dark:text-zinc-100 pink:text-pink-900">
      <main className="flex-1 overflow-y-hidden px-8 py-6">

        {/* Desktop: Kanban columns — hidden on mobile */}
        <div className="relative hidden md:flex h-full gap-6 items-start">
          {canGoLeft && (
            <button
              onClick={() => setStartIndex(startIndex - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-lg border border-slate-200 bg-white px-3 py-4 text-xl text-slate-500 shadow-md hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              ‹
            </button>
          )}

          <div className={`flex h-full gap-6 ${canGoLeft ? 'pl-10' : ''} ${canGoRight ? 'pr-10' : ''}`}>
            {visibleStatuses.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                jobs={jobs.filter((job) => job.status === status)}
              />
            ))}
          </div>

          {canGoRight && (
            <button
              onClick={() => setStartIndex(startIndex + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-lg border border-slate-200 bg-white px-3 py-4 text-xl text-slate-500 shadow-md hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              ›
            </button>
          )}
        </div>

        {/* Mobile: Accordion — hidden on desktop */}
        <div className="flex flex-col gap-3 md:hidden">
          <KanbanAccordion statuses={statuses} jobs={jobs} />
        </div>

      </main>
    </div>
  )
}
