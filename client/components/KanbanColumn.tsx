import { Job, JobStatus } from '../../models/job'
import KanbanCard from './KanbanCard'

interface Props {
  status: JobStatus
  jobs: Job[]
}

export default function KanbanColumn({ status, jobs }: Props) {
  const statusColors = {
    Todo: 'bg-zinc-500',
    'In Progress': 'bg-amber-500',
    Review: 'bg-blue-500',
    Done: 'bg-emerald-500',
  }

  return (
    <div className="flex w-80 shrink-0 flex-col gap-4 rounded-xl bg-zinc-900/40 p-3">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
          <h2 className="text-sm font-bold tracking-wide text-zinc-200">
            {status}
          </h2>
          <span className="ml-1 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-400">
            {jobs.length}
          </span>
        </div>
        <button className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {jobs.map((job) => (
          <KanbanCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-800/50 py-12 text-zinc-600">
            <p className="text-xs">No jobs in {status}</p>
          </div>
        )}
      </div>
    </div>
  )
}
