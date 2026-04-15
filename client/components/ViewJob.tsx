import { Link, useNavigate, useParams } from 'react-router'
import { Job, statuses } from '../../models/job'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useJobs } from '../hooks/useJob'
import { useQueryClient } from '@tanstack/react-query'
import { useCustomer } from '../hooks/useCustomer'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function ViewJob() {
  const { data: customers } = useCustomer()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const navigate = useNavigate()
  const jobDetails = useJobs(Number(id))

  queryClient.invalidateQueries({ queryKey: ['jobs'] })

  const [formState, setFormState] = useState(true)
  const [formData, setFormData] = useState({} as Job)
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [loadingMap, setLoadingMap] = useState(true)

  const { data: job, isPending, isError, error } = jobDetails

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        if (!job?.address) return
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(job.address)}&format=json&limit=1`,
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            },
          },
        )
        console.log(response.body)
        const data = await response.json()
        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)])
        } else {
          console.warn('No results found for address')
        }
      } catch (error) {
        console.error('Geocoding failed', error)
      } finally {
        setLoadingMap(false)
      }
    }

    if (!job?.address) return
    fetchCoordinates()
  }, [job?.address])

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

  function editHandler(job: Job) {
    setFormData({ ...job })
    if (formState == true) {
      setFormState(false)
    } else {
      setFormState(true)
    }
  }

  const handleEdit = async (job: Job) => {
    if (job.endDate < job.startDate) {
      toast.error('End date cannot be before start date')
      return
    }
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
      <div className="mx-auto max-w-4xl p-6 text-slate-900 dark:text-zinc-100 pink:text-pink-900">
        <h1 className="text-2xl font-semibold">Job not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 pink:border-pink-300 pink:bg-pink-50 pink:text-pink-800"
        >
          Back to Board
        </Link>
      </div>
    )
  }
  if (isPending) return 'Loading...'

  if (isError) return 'An error has occurred: ' + error.message

  return (
    <div className="mx-auto max-w-5xl p-6 text-slate-800 transition-colors duration-300 pink:text-pink-900 dark:text-zinc-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          {formState ? (
            <h1 className="text-3xl font-semibold">{job.title}</h1>
          ) : (
            <input
              name="title"
              onChange={inputHandler}
              value={formData.title}
              type="text"
              className="mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            ></input>
          )}
          <p className="mt-1 text-slate-500 pink:text-pink-700 dark:text-zinc-400">
            {job.address}
          </p>
        </div>
        <div className="flex gap-2 rounded-md border border-slate-200 bg-slate-100 p-2 pink:border-pink-200 pink:bg-pink-100 dark:border-zinc-800 dark:bg-zinc-800/50">
          <button
            onClick={() => editHandler(job)}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 pink:border-pink-200 pink:bg-pink-50 pink:text-pink-700 pink:hover:bg-pink-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(job.id)}
            className="rounded-md border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-100 pink:border-rose-300 pink:bg-rose-50 pink:text-rose-700 pink:hover:bg-rose-100 dark:border-zinc-700 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
          >
            Delete
          </button>
          <Link
            to="/"
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 pink:border-pink-200 pink:bg-pink-50 pink:text-pink-700 pink:hover:bg-pink-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Back to Board
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors pink:border-pink-200 pink:bg-pink-50 dark:border-zinc-800 dark:bg-zinc-800/50 dark:shadow-none md:col-span-2">
          <h2 className="mb-3 text-xl font-semibold">Notes</h2>

          {formState ? (
            <p className="mb-5 text-slate-600 pink:text-pink-800 dark:text-zinc-300">
              {job.notes}
            </p>
          ) : (
            <input
              name="notes"
              onChange={inputHandler}
              value={formData.notes}
              type="text"
              className="mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            ></input>
          )}

          <h3 className="mb-2 text-lg font-medium">Start Date</h3>
          {formState ? (
            <p className="mb-5 text-slate-500 pink:text-pink-800 dark:text-zinc-400">
              {new Date(job.startDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="startDate"
              onChange={inputHandler}
              value={formData.startDate}
              type="date"
              className="mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]"
            ></input>
          )}

          <h3 className="mb-2 text-lg font-medium">End Date</h3>

          {formState ? (
            <p className="mb-5 text-slate-500 pink:text-pink-800 dark:text-zinc-400">
              {new Date(job.endDate).toLocaleDateString()}
            </p>
          ) : (
            <input
              name="endDate"
              onChange={inputHandler}
              value={formData.endDate}
              min={formData.startDate}
              type="date"
              className="mb-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]"
            ></input>
          )}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-5 pink:border-pink-100 dark:border-zinc-800">
            {!formState && (
              <button
                type="button"
                onClick={() => editHandler(job)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 pink:border-pink-200 pink:bg-pink-100 pink:text-pink-700 pink:hover:bg-pink-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
            )}
            {!formState && (
              <button
                onClick={() => handleEdit({ ...job, ...formData })}
                type="submit"
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-zinc-900 hover:bg-amber-400 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors pink:border-pink-200 pink:bg-pink-50 dark:border-zinc-800 dark:bg-zinc-800/50 dark:shadow-none">
            <h2 className="mb-3 text-xl font-semibold">Details</h2>
            <div className="space-y-2 text-sm text-slate-500 pink:text-pink-700 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-700 pink:text-pink-900 dark:text-zinc-200">
                  Customer:
                </span>
                <Link
                  className="hover:underline"
                  to={`/customer/${job.customerId}`}
                >
                  {job.customerName}
                </Link>
              </div>
              {!formState && (
                <select
                  id="customerId"
                  name="customerId"
                  value={formData.customerId}
                  required
                  onChange={inputHandler}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  <option value={0} disabled>
                    Select a customer…
                  </option>
                  {customers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              )}
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-700 pink:text-pink-900 dark:text-zinc-200">
                  Tradie:
                </span>

                <p>{job.tradieName}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-700 pink:text-pink-900 dark:text-zinc-200">
                  Status:
                </span>
                {formState ? (
                  <p>{job.status}</p>
                ) : (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={inputHandler}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500
focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900
dark:text-zinc-100"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-700 pink:text-pink-900 dark:text-zinc-200">
                  Quote:
                </span>{' '}
                {formState ? (
                  <p>{job.quote}</p>
                ) : (
                  <input
                    onChange={inputHandler}
                    name="quote"
                    value={formData.quote}
                    type="number"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  ></input>
                )}
              </div>
              <p>
                <span className="font-medium text-slate-700 pink:text-pink-900 dark:text-zinc-200">
                  Due Date:
                </span>{' '}
                {new Date(job.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex h-[480px] w-full max-w-2xl items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 pink:border-pink-200 pink:bg-pink-100 dark:border-zinc-800 dark:bg-zinc-800/50">
        {loadingMap ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-slate-400 pink:text-pink-700 dark:text-zinc-500">
              Loading OpenStreetMap...
            </p>
            <img
              src="/osm_logo.svg"
              alt="OpenStreetMap Logo"
              className="h-11 w-11 opacity-50 pink:brightness-125 dark:opacity-100"
            />
          </div>
        ) : position ? (
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {job.title}
                <br></br>
                {job.address}
              </Popup>
              <Tooltip>
                {job.title}
                <br></br>
                {job.address}
              </Tooltip>
            </Marker>
          </MapContainer>
        ) : (
          <p className="text-sm text-slate-400 pink:text-pink-700 dark:text-zinc-500">
            Location not found
          </p>
        )}
      </div>
    </div>
  )
}
