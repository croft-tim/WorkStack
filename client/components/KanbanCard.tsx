import { Job, JobStatus, statuses } from '../../models/job'
import { useNavigate } from 'react-router'
import { useDeleteJob } from '../hooks/useDeleteJob'
import { useUpdateJob } from '../hooks/useJob'

interface Props {
  job: Job
}

export default function KanbanCard({ job }: Props) {
  const { mutate: deleteJob } = useDeleteJob()
  const { mutate: updateJob } = useUpdateJob()
  const navigate = useNavigate()

  const handleStatusChange = (nextStatus: JobStatus) => {
    updateJob({
      ...job,
      status: nextStatus,
    })
  }

  return (
    <button
      onClick={() => navigate(`/jobs/${job.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/jobs/${job.id}`)
        }
      }}
      className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:shadow-lg hover:shadow-black/5 pink:border-pink-200 pink:bg-pink-50 pink:hover:border-pink-300 pink:hover:shadow-pink-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:shadow-black/20"
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-amber-500 pink:text-pink-900 pink:group-hover:text-pink-600 dark:text-zinc-100">
          {job.title}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-xs text-slate-600 pink:text-pink-700 dark:text-zinc-300">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>

          {job.customerName}
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3 pink:border-pink-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-[11px] text-slate-600 pink:text-pink-800 dark:text-zinc-300">
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
              d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
            />
          </svg>
          {job.tradieName}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-600 pink:text-pink-800 dark:text-zinc-300">
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
          {job.address}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-600 pink:text-pink-800 dark:text-zinc-300">
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
          Due: {new Date(job.endDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <div>
          <label htmlFor={`status-${job.id}`} className="sr-only">Job status</label>
          <select
            id={`status-${job.id}`}
            value={job.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation()
              handleStatusChange(e.target.value as JobStatus)
            }}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-50 pink:border-pink-200 pink:bg-pink-100 pink:text-pink-700 pink:hover:bg-pink-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            if (window.confirm(`Do you really want to delete this job?`)) {
              deleteJob(job.id)
            }
          }}
          className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-600 transition hover:bg-rose-500/20 pink:border-rose-300 pink:bg-rose-50 pink:text-rose-700 pink:hover:bg-rose-100 dark:text-rose-400"
        >
          Delete
        </button>
      </div>
    </button>
  )
}
