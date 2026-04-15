import { useState } from 'react'
import { Link } from 'react-router'
import { Job, JobStatus } from '../../models/job'
import KanbanCard from './KanbanCard'

interface Props {
  statuses: readonly JobStatus[]
  jobs: Job[]
}

const statusColors: Record<JobStatus, string> = {
  New: 'bg-red-500',
  Quoted: 'bg-amber-500',
  'In Progress': 'bg-blue-500',
  Invoiced: 'bg-purple-500',
  Completed: 'bg-emerald-500',
}

export default function KanbanAccordion({ statuses, jobs }: Props) {
  const [activeStatus, setActiveStatus] = useState<JobStatus | null>(null)

  const filteredJobs = activeStatus
    ? jobs.filter((job) => job.status === activeStatus)
    : []

  return (
    <div className="flex flex-col gap-4">
      {/* Quick nav buttons */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          <Link
            to="/kanban"
            className="flex items-center rounded-l-lg bg-amber-500 px-4 py-2 text-xs font-bold text-zinc-900 transition-all hover:bg-amber-400 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
          >
            Jobs
          </Link>
          <Link
            to="/jobs/new"
            className="flex items-center rounded-r-lg bg-amber-500 px-2 py-2 text-xs font-bold text-zinc-900 transition-all hover:bg-amber-400 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
            aria-label="New Job"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>
        <div className="flex items-center gap-0.5">
          <Link
            to="/customers"
            className="flex items-center rounded-l-lg bg-slate-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-slate-700 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
          >
            Customers
          </Link>
          <Link
            to="/customers/new"
            className="flex items-center rounded-r-lg bg-slate-600 px-2 py-2 text-xs font-bold text-white transition-all hover:bg-slate-700 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
            aria-label="New Customer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Status tiles */}
      <div className="grid grid-cols-1 gap-3">
        {statuses.map((status) => {
          const count = jobs.filter((job) => job.status === status).length
          const isActive = activeStatus === status

          return (
            <button
              key={status}
              onClick={() => setActiveStatus(isActive ? null : status)}
              aria-expanded={isActive}
              className={`flex flex-col items-start gap-1 rounded-lg border p-4 transition-all duration-200 ${
                isActive
                  ? 'border-slate-300 bg-slate-100 dark:border-zinc-600 dark:bg-zinc-800'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${statusColors[status]}`}
                />
                <span className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
                  {status}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-400">
                {count} job{count !== 1 ? 's' : ''}
              </span>
            </button>
          )
        })}
      </div>

      {/* Job cards for selected status */}
      {activeStatus && (
        <div className="flex flex-col gap-3">
          {filteredJobs.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center text-xs text-slate-400 dark:border-zinc-800/50 dark:text-zinc-600 pink:border-pink-200 pink:text-pink-400">
              No jobs in {activeStatus}
            </div>
          ) : (
            filteredJobs.map((job) => <KanbanCard key={job.id} job={job} />)
          )}
        </div>
      )}
    </div>
  )
}
