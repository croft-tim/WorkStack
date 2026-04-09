import { Link, useParams } from 'react-router'
import { Job } from '../../models/job'
import useJobData from '../hooks/UseJobData'

export default function ViewJob() {
  const { id } = useParams()
  const { data: job, isPending, isError, error } = useJobData(Number(id))

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-zinc-100">
        <h1 className="text-2xl font-semibold">Job not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200"
        >
          Back to Board
        </Link>
      </div>
    )
  }
  if (isPending) return 'Loading...'

  if (isError) return 'An error has occurred: ' + error.message

  return (
    <div className="mx-auto max-w-5xl p-6 text-zinc-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{job.id}</p>
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="mt-1 text-zinc-400">{job.status}</p>
        </div>

        <Link
          to="/"
          className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-700"
        >
          Back to Board
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 md:col-span-2">
          <h2 className="mb-3 text-xl font-semibold">Job Overview</h2>
          <p className="mb-4 text-zinc-300">{job.notes}</p>

          <h3 className="mb-2 text-lg font-medium">Description</h3>
          <p className="mb-5 text-zinc-400">{job.endDate}</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-xl font-semibold">Details</h2>
            <div className="space-y-2 text-sm text-zinc-400">
              <p>
                <span className="font-medium text-zinc-200">Status:</span>{' '}
                {job.status}
              </p>

              <p>
                <span className="font-medium text-zinc-200">Due Date:</span>{' '}
                {new Date(job.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
