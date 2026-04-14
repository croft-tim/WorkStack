import { useState } from 'react'
import { useCustomerSearch, useJobSearch } from '../hooks/useSearch'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { Job } from '../../models/job'
import { Customer } from '../../models/customer'

function Search() {
  const queryClient = useQueryClient()
  const [input, setinput] = useState<string>('')
  const [show, setshow] = useState<string | null>()

  function searchhandler(e: React.ChangeEvent<HTMLInputElement>) {
    setinput(e.target.value)
    queryClient.invalidateQueries({ queryKey: ['jobsearch'] })
    queryClient.invalidateQueries({ queryKey: ['customersearch'] })
  }

  function unfocusHandler() {
    setTimeout(() => {
      setshow(null)
      setinput('')
    }, 250)
  }

  function focusHandler() {
    setshow('show')
    queryClient.invalidateQueries({ queryKey: ['jobsearch'] })
    queryClient.invalidateQueries({ queryKey: ['customersearch'] })
  }

  return (
    <div>
      <input
        onFocus={focusHandler}
        onBlur={unfocusHandler}
        onChange={searchhandler}
        value={input}
        type="text"
        placeholder="Search jobs, clients..."
        className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500/50 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white dark:placeholder:text-zinc-500"
      />
      {show && <SearchCard query={input} />}
    </div>
  )
}

function SearchJobItems({ jobs }: { jobs: Job[] }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-2">
      {jobs.map((job) => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/jobs/${job.id}`)}
          onKeyDown={() => navigate(`/jobs/${job.id}`)}
          key={job.id}
          className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-amber-500">
              {job.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">{job.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SearchCustomerItems({ customers }: { customers: Customer[] }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-2">
      {customers.map((customer) => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/customer/${customer.id}`)}
          onKeyDown={() => navigate(`/customer/${customer.id}`)}
          key={customer.id}
          className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-amber-500">
              {customer.name}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">{}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SearchCard({ query }: { query: string }) {
  const {
    data: jobs,
    isPending: jobpend,
    isError: joberror,
  } = useJobSearch(query)
  const {
    data: cutomers,
    isPending: customerpend,
    isError: customererror,
  } = useCustomerSearch(query)

  return (
    <div
      className="absolute z-10 mt-2 rounded-lg border border-zinc-500 bg-zinc-950 p-3"
      style={{
        width: '300px',
        maxHeight: '500px',
        overflow: 'auto',
      }}
    >
      <div className="text-white">
        <h2 className="mb-3 text-sm font-bold tracking-wide text-zinc-200">
          Jobs
        </h2>
        <div>
          {jobpend && <p className=" text-zinc-400">Loading jobs</p>}
          {joberror && <p className=" text-rose-400">No jobs found</p>}
          {jobs && <SearchJobItems jobs={jobs} />}
        </div>
      </div>

      <div className="text-white">
        <h2 className="mb-3 mt-3 text-sm font-bold tracking-wide text-zinc-200">
          Customers
        </h2>
        <div>
          {customerpend && <p className=" text-zinc-400">Loading customers</p>}
          {customererror && (
            <p className=" text-rose-400">No customers found</p>
          )}
          {cutomers && <SearchCustomerItems customers={cutomers} />}
        </div>
      </div>
    </div>
  )
}

export default Search
