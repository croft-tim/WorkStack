import { Job } from '../../models/job'
import { Link } from 'react-router'
import { useDeleteJob } from '../hooks/useDeleteJob'

interface Props {
  job: Job
}

export default function KanbanCard({ job }: Props) {
  const { mutate: deleteJob } = useDeleteJob()

  const priorityColors = {
    High: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  }

  return (
    <div className="group relative flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-start justify-between">
        {/* <span className="text-xs font-medium text-zinc-500">{job.id}</span> */}
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${priorityColors[job.priority]}`}
        >
          {job.priority}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-amber-500">
          {job.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-400">{job.client}</p>
      </div>

      <div className="mt-2 flex flex-col gap-2 border-t border-zinc-800 pt-3">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {job.location}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Due: {new Date(job.dueDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <button className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-700">
          Change Status
        </button>

        <Link
          to={`/jobs/${job.id}`}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-700"
        >
          Open
        </Link>

        <button
          onClick={() => {
            if (window.confirm(`Do you really want to delete this job?`)) {
              deleteJob(job.id)
            }
          }}
          className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-400 transition hover:bg-rose-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
