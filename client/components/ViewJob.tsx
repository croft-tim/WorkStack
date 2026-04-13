import { Link, useNavigate, useParams } from 'react-router'
import { Job, JobStatus, statuses } from '../../models/job'
import { useState } from 'react'
import { useJobs } from '../hooks/useJob'

export default function ViewJob() {
  const { id } = useParams()
  const navigate = useNavigate()
  const jobDetails = useJobs(Number(id))

  const [formState, setFormState] = useState(true)
  const [formData, setFormData] = useState({})

  const { data: job, isPending, isError, error } = jobDetails

  function inputHandler(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log(formData)
  }

  function editHandler() {
    setFormData({ ...job })
    if (formState == true) {
      setFormState(false)
    } else {
      setFormState(true)
    }
  }

  const handleEdit = async (job) => {
    jobDetails.update.mutate(job)
    setFormState(true)
  }

  const handleDelete = async (id: number) => {
    jobDetails.delete.mutate(id)
    setTimeout(() => {
      navigate('/kanban')
    }, 500)
  }

  const handleStatusChange = (nextStatus: JobStatus) => {
    if (!job) return

    jobDetails.update.mutate({
      ...job,
      status: nextStatus,
    })
  }

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
    <div className="pink:text-pink-900 mx-auto max-w-5xl p-6 text-slate-800 transition-colors duration-300 dark:text-zinc-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="pink:text-pink-500 text-sm text-slate-400 dark:text-zinc-500">
            {job.id}
          </p>
          {formState ? (
            <h1 className="text-3xl font-semibold">{job.title}</h1>
          ) : (
            <input
              name="title"
              onChange={inputHandler}
              value={formData.title}
              type="text"
              className="pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            ></input>
          )}
          <p className="pink:text-pink-700 mt-1 text-slate-500 dark:text-zinc-400">
            {job.status}
          </p>
        </div>
        <div className="pink:bg-pink-100 pink:border-pink-200 flex gap-2 rounded-md border border-slate-200 bg-slate-100 p-2 dark:border-zinc-800 dark:bg-zinc-800/50">
          <button
            onClick={editHandler}
            className="pink:border-pink-200 pink:bg-pink-50 pink:text-pink-700 pink:hover:bg-pink-100 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="pink:border-rose-200 pink:bg-rose-50 pink:text-rose-600 pink:hover:bg-rose-100 rounded-md border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-100 dark:border-zinc-700 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
          >
            Delete
          </button>
          <Link
            to="/"
            className="pink:border-pink-200 pink:bg-pink-50 pink:text-pink-700 pink:hover:bg-pink-100 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Back to Board
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="pink:border-pink-200 pink:bg-pink-50 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors md:col-span-2 dark:border-zinc-800 dark:bg-zinc-800/50 dark:shadow-none">
          <h2 className="mb-3 text-xl font-semibold">Job Overview</h2>

          {formState ? (
            <p className="pink:text-pink-800 mb-5 text-slate-600 dark:text-zinc-300">
              {job.notes}
            </p>
          ) : (
            <input
              name="notes"
              onChange={inputHandler}
              value={formData.notes}
              type="text"
              className="pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            ></input>
          )}
          {/*
          {formState ? (
            <p className="mb-5 text-zinc-300">{job.inspection}</p>
          ) : (
            <input
              value={job.inspection}
              type="text"
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
            ></input>
          )}
          */}
          <h3 className="mb-2 text-lg font-medium">Start Date</h3>
          {formState ? (
            <p className="pink:text-pink-600 mb-5 text-slate-500 dark:text-zinc-400">
              {new Date(job.startDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="startDate"
              onChange={inputHandler}
              value={formData.startDate}
              type="date"
              className="pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]"
            ></input>
          )}

          <h3 className="mb-2 text-lg font-medium">End Date</h3>

          {formState ? (
            <p className="pink:text-pink-600 mb-5 text-slate-500 dark:text-zinc-400">
              {new Date(job.endDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="endDate"
              onChange={inputHandler}
              value={formData.endDate}
              type="date"
              className="pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]"
            ></input>
          )}
          {/*
          {formState ? (
            <p className="mb-5 text-zinc-300">{job.notes}</p>
          ) : (
            <input
              value={job.notes}
              type="text"
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
            ></input>
          )}
          */}
          {!formState && (
            <button
              onClick={() => handleEdit({ ...job, ...formData })}
              type="submit"
              className="pink:bg-pink-500 pink:hover:bg-pink-400 rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-400"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="pink:border-pink-200 pink:bg-pink-50 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-800/50 dark:shadow-none">
            <h2 className="mb-3 text-xl font-semibold">Details</h2>
            <div className="pink:text-pink-700 space-y-2 text-sm text-slate-500 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <span className="pink:text-pink-900 font-medium text-slate-700 dark:text-zinc-200">
                  Status:
                </span>
                <select
                  value={job.status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value as JobStatus)
                  }
                  className="pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2
  text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900
  dark:text-zinc-100"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1">
                <span className="pink:text-pink-900 font-medium text-slate-700 dark:text-zinc-200">
                  Quote:
                </span>{' '}
                {formState ? (
                  <p>{job.quote}</p>
                ) : (
                  <input
                    onChange={inputHandler}
                    name="quote"
                    value={formData.quote}
                    type="text"
                    className="pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  ></input>
                )}
              </div>
              <p>
                <span className="pink:text-pink-900 font-medium text-slate-700 dark:text-zinc-200">
                  Due Date:
                </span>{' '}
                {new Date(job.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
