import { useParams, useNavigate } from 'react-router'
import { useCustomerById } from '../hooks/useCustomer'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { useCustomerJobSearch } from '../hooks/useSearch'

export default function CustomerView() {
  const { id } = useParams()
  const {
    data: customer,
    isPending,
    isError,
    error,
  } = useCustomerById(Number(id))

  const {
    data: jobs,
    isPending: jobpend,
    isError: joberror,
  } = useCustomerJobSearch(Number(id))

  const navigate = useNavigate()

  const [position, setPosition] = useState<[number, number] | null>(null)
  const [loadingMap, setLoadingMap] = useState(true)

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        // Use Nominatim API to get coordinates from address
        if (!customer?.address) return
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(customer.address)}&format=json&limit=1`,
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

    if (!customer?.address) return
    fetchCoordinates()
  }, [customer?.address])

  if (isPending) return <p className="p-8 text-slate-400 dark:text-zinc-400 pink:text-pink-400">Loading...</p>
  if (isError) return <p className="p-8 text-rose-500 dark:text-rose-400 pink:text-rose-700">Error: {error.message}</p>
  if (!customer) return <p className="p-8 text-slate-500 dark:text-zinc-400 pink:text-pink-700">Customer not found</p>

  return (
    <div className="min-h-screen bg-white p-8 transition-colors duration-300 pink:bg-pink-50 dark:bg-zinc-900">
      <div className="mx-auto mt-5 max-w-2xl rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:shadow-black/5 pink:border-pink-200 pink:bg-pink-50 pink:hover:border-pink-300 pink:hover:shadow-pink-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:shadow-black/20">
        <div className="flex items-start justify-between">
          <h1 className="text-sm font-semibold text-slate-800 transition-colors pink:text-pink-900 dark:text-zinc-300">
            {customer.name || 'Customer'}
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-500 pink:border-pink-500/20 pink:bg-pink-500/10 pink:text-pink-800">
            <svg
              className="h-3 w-3 text-zinc-500 pink:text-pink-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            {customer.rating}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/customer/${customer.id}/edit`)}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-zinc-900 transition-all hover:bg-amber-400 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
          >
            Edit customer
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-3 pink:border-pink-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pink:text-pink-700 dark:text-zinc-500">
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
            {customer.address}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pink:text-pink-700 dark:text-zinc-500">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {customer.email}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pink:text-pink-700 dark:text-zinc-500">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {customer.phone}
          </div>
          {customer.notes && (
            <p className="mt-6 text-[13px] italic text-slate-600 pink:text-pink-800 dark:text-zinc-400">
              {customer.notes}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-2xl rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:shadow-black/5 pink:border-pink-200 pink:bg-pink-50 pink:hover:border-pink-300 pink:hover:shadow-pink-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:shadow-black/20">
        <h2 className="mb-3 text-sm font-semibold text-slate-800 transition-colors pink:text-pink-900 dark:text-zinc-300">
          Previous jobs
        </h2>
        <div className="flex flex-col gap-2">
          {jobpend && <p className=" text-zinc-400">Loading jobs</p>}
          {joberror && <p className=" text-rose-400">No jobs found</p>}
          {jobs &&
            jobs.map((job) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/jobs/${job.id}`)}
                onKeyDown={() => navigate(`/jobs/${job.id}`)}
                key={job.id}
                className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-all duration-200 hover:bg-slate-100 pink:border-pink-200 pink:bg-pink-50 pink:hover:bg-pink-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-lg dark:hover:shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800 group-hover:text-amber-500 pink:text-pink-900 dark:text-zinc-100">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">{job.status}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <div className="mx-auto mt-8 h-[480px] w-full max-w-2xl overflow-hidden rounded-lg border border-zinc-800">
        {position && ( */}
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
                {customer.name}
                <br></br>
                {customer.address}
              </Popup>
              <Tooltip>
                {customer.name}
                <br></br>
                {customer.address}
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
