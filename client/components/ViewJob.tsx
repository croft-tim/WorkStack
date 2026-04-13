import { Link, useNavigate, useParams } from 'react-router'
import { Job } from '../../models/job'
import { useState } from 'react'
import { useJobs } from '../hooks/useJob'
import { useQueryClient } from '@tanstack/react-query'

export default function ViewJob() {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const navigate = useNavigate()
  const jobDetails = useJobs(Number(id))

  queryClient.invalidateQueries({ queryKey: ['jobs'] })

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
    <div className="mx-auto max-w-5xl p-6 text-zinc-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{job.id}</p>
          {formState ? (
            <h1 className="text-3xl font-semibold">{job.title}</h1>
          ) : (
            <input
              name="title"
              onChange={inputHandler}
              value={formData.title}
              type="text"
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
            ></input>
          )}
          <p className="mt-1 text-zinc-400">{job.status}</p>
        </div>
        <div className="flex gap-2 rounded-md bg-zinc-900 p-2">
          <button
            onClick={editHandler}
            className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="rounded-md border border-zinc-700 bg-rose-500/10 px-4 py-2 text-sm text-rose-400 transition hover:bg-rose-500/20"
          >
            Delete
          </button>
          <Link
            to="/"
            className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-700"
          >
            Back to Board
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 md:col-span-2">
          <h2 className="mb-3 text-xl font-semibold">Job Overview</h2>

          {formState ? (
            <p className="mb-5 text-zinc-300">{job.notes}</p>
          ) : (
            <input
              name="notes"
              onChange={inputHandler}
              value={formData.notes}
              type="text"
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
            ></input>
          )}
          {/*
          <h3 className="mb-2 text-lg font-medium">Inspection</h3>

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
            <p className="mb-5 text-zinc-400">
              {new Date(job.startDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="start_date"
              onChange={inputHandler}
              value={formData.startDate}
              type="date"
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
            ></input>
          )}

          <h3 className="mb-2 text-lg font-medium">End Date</h3>

          {formState ? (
            <p className="mb-5 text-zinc-400">
              {new Date(job.endDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="end_date"
              onChange={inputHandler}
              value={formData.endDate}
              type="date"
              className="mb-5 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
            ></input>
          )}
          {/*
          <h3 className="mb-2 text-lg font-medium">Notes</h3>

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
              className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-black hover:bg-amber-400"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-xl font-semibold">Details</h2>
            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <span className="font-medium text-zinc-200">Status:</span>
                {formState ? (
                  <p>{job.status}</p>
                ) : (
                  <select
                    onChange={inputHandler}
                    id="status"
                    name="status"
                    value={formData.status}
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
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
                <span className="font-medium text-zinc-200">Quote:</span>{' '}
                {formState ? (
                  <p>{job.quote}</p>
                ) : (
                  <input
                    onChange={inputHandler}
                    name="quote"
                    value={formData.quote}
                    type="text"
                    className=" w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3
           py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
                  ></input>
                )}
              </div>
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
