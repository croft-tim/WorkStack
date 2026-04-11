import { Link, useNavigate, useParams } from 'react-router'
import { Job } from '../../models/job'
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
    <div className="mx-auto max-w-5xl p-6 transition-colors duration-300 text-slate-800 dark:text-zinc-100 pink:text-pink-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 dark:text-zinc-500 pink:text-pink-500">{job.id}</p>
          {formState ? (
            <h1 className="text-3xl font-semibold">{job.title}</h1>
          ) : (
            <input
              name="title"
              onChange={inputHandler}
              value={formData.title}
              type="text"
              className="mb-5 w-full rounded-lg border px-3 py-2 text-sm transition-colors border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500"
            ></input>
          )}
          <p className="mt-1 text-slate-500 dark:text-zinc-400 pink:text-pink-700">{job.status}</p>
        </div>
        <div className="flex gap-2 rounded-md bg-slate-100 dark:bg-zinc-800/50 pink:bg-pink-100 p-2 border border-slate-200 dark:border-zinc-800 pink:border-pink-200">
          <button
            onClick={editHandler}
            className="rounded-md border px-4 py-2 text-sm transition-colors border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 pink:border-pink-200 pink:bg-pink-50 pink:text-pink-700 pink:hover:bg-pink-100"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="rounded-md border px-4 py-2 text-sm transition-colors border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-zinc-700 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 pink:border-rose-200 pink:bg-rose-50 pink:text-rose-600 pink:hover:bg-rose-100"
          >
            Delete
          </button>
          <Link
            to="/"
            className="rounded-md border px-4 py-2 text-sm transition-colors border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 pink:border-pink-200 pink:bg-pink-50 pink:text-pink-700 pink:hover:bg-pink-100"
          >
            Back to Board
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-5 md:col-span-2 transition-colors border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50 pink:border-pink-200 pink:bg-pink-50 shadow-sm dark:shadow-none">
          <h2 className="mb-3 text-xl font-semibold">Job Overview</h2>

          {formState ? (
            <p className="mb-5 text-slate-600 dark:text-zinc-300 pink:text-pink-800">{job.notes}</p>
          ) : (
            <input
              name="notes"
              onChange={inputHandler}
              value={formData.notes}
              type="text"
              className="mb-5 w-full rounded-lg border px-3 py-2 text-sm transition-colors border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500"
            ></input>
          )}

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
            <p className="mb-5 text-slate-500 dark:text-zinc-400 pink:text-pink-600">
              {new Date(job.startDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="start_date"
              onChange={inputHandler}
              value={formData.startDate}
              type="date"
              className="mb-5 w-full rounded-lg border px-3 py-2 text-sm transition-colors border-slate-200 bg-slate-50 text-slate-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500"
            ></input>
          )}

          <h3 className="mb-2 text-lg font-medium">End Date</h3>

          {formState ? (
            <p className="mb-5 text-slate-500 dark:text-zinc-400 pink:text-pink-600">
              {new Date(job.endDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="end_date"
              onChange={inputHandler}
              value={formData.endDate}
              type="date"
              className="mb-5 w-full rounded-lg border px-3 py-2 text-sm transition-colors border-slate-200 bg-slate-50 text-slate-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark] pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500"
            ></input>
          )}

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
              onClick={() => handleEdit({ ...formData })}
              type="submit"
              className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-400 pink:bg-pink-500 pink:hover:bg-pink-400"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-5 transition-colors border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50 pink:border-pink-200 pink:bg-pink-50 shadow-sm dark:shadow-none">
            <h2 className="mb-3 text-xl font-semibold">Details</h2>
            <div className="space-y-2 text-sm text-slate-500 dark:text-zinc-400 pink:text-pink-700">
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-700 dark:text-zinc-200 pink:text-pink-900">Status:</span>
                {formState ? (
                  <p>{job.status}</p>
                ) : (
                  <select
                    onChange={inputHandler}
                    id="status"
                    name="status"
                    value={formData.status}
                    className="rounded-lg border px-3 py-2 text-sm transition-colors border-slate-200 bg-slate-50 text-slate-900 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500"
                  >
                    <option value="New">New</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Awaiting Inspection">
                      Awaiting Inspection
                    </option>
                    <option value="Done">Done</option>
                  </select>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-700 dark:text-zinc-200 pink:text-pink-900">Quote:</span>{' '}
                {formState ? (
                  <p>{job.quote}</p>
                ) : (
                  <input
                    onChange={inputHandler}
                    name="quote"
                    value={formData.quote}
                    type="text"
                    className="w-full rounded-lg border px-3 py-2 text-sm transition-colors border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500"
                  ></input>
                )}
              </div>
              <p>
                <span className="font-medium text-slate-700 dark:text-zinc-200 pink:text-pink-900">Due Date:</span>{' '}
                {new Date(job.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
