import { Job, JobStatus } from '../../models/job'
import KanbanCard from './KanbanCard'
import { useNavigate } from 'react-router'

interface Props {
  status: JobStatus
  jobs: Job[]
}

export default function KanbanColumn({ status, jobs }: Props) {
  const navigate = useNavigate()

  function handleAddJob() {
    navigate(`/jobs/new?status=${encodeURIComponent(status)}`)
  }

  const statusColors = {
    New: 'bg-red-500',
    Quoted: 'bg-amber-500',
    'In Progress': 'bg-blue-500',
    Invoiced: 'bg-pink-400',
    Completed: 'bg-emerald-500',
  }

  return (
    <div className="flex min-w-60 flex-1 flex-col gap-4 rounded-xl bg-slate-100/70 p-3 transition-colors pink:bg-pink-100/50 dark:bg-zinc-800/50">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
          <h2 className="text-sm font-bold tracking-wide text-slate-700 pink:text-pink-800 dark:text-zinc-200">
            {status}
          </h2>
          <span className="ml-1 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-500 pink:bg-pink-200 pink:text-pink-600 dark:bg-zinc-800 dark:text-zinc-400">
            {jobs.length}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddJob}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 pink:text-pink-400 pink:hover:bg-pink-200 pink:hover:text-pink-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
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

      <div className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent flex flex-col gap-3 overflow-y-auto pr-1">
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
