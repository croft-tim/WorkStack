import { ChangeEvent, FormEvent, useState } from 'react'
import { Job, JobData, statuses } from '../../models/job.ts'
import { useCustomer } from '../hooks/useCustomer.ts'
import { Link } from 'react-router'
import toast from 'react-hot-toast'

const defaultJobData: Partial<JobData> = {
  tradieId: 1,
  customerId: 0,
  status: 'New',
  title: '',
  quote: 0,
  notes: '',
  startDate: '',
  endDate: '',
}

interface JobFormProps {
  initialData?: Partial<Job>
  onSubmit: (data: Partial<JobData>) => Promise<unknown>
}

export default function JobForm({ initialData, onSubmit }: JobFormProps) {
  const { data: customers } = useCustomer()

  const [formData, setFormData] = useState<Partial<JobData>>({
    ...defaultJobData,
    ...initialData,
  })

  const isEditing = Boolean(initialData)

  function handleChange(
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = evt.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault()
    if (!formData.customerId) {
      toast.error('Please select a customer')
      return
    }
    if (!formData.startDate) {
      toast.error('Please select a start date')
      return
    }
    if (!formData.endDate) {
      toast.error('Please select an end date')
      return
    }
    if (formData.endDate < formData.startDate) {
      toast.error('End date cannot be before start date')
      return
    }
    await toast.promise(onSubmit(formData), {
      loading: 'Saving job...',
      success: 'Job saved.',
      error: 'Failed to save job!',
    })
  }

  return (
    <div className="min-h-screen bg-white p-8 transition-colors duration-300 pink:bg-pink-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-xs text-slate-500 pink:text-pink-500 dark:text-zinc-500">
            Jobs / {isEditing ? 'Edit' : 'New'}
          </p>
          <h1 className="text-xl font-medium text-slate-800 pink:text-pink-900 dark:text-zinc-50">
            {isEditing ? 'Edit job' : 'Create job'}
          </h1>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 shadow-sm transition-colors pink:border-pink-200 pink:bg-pink-50 pink:shadow-pink-500/5 dark:border-zinc-800 dark:bg-zinc-800/50 dark:shadow-none">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="title"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Job title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Fix leaking tap at 42 Main St"
                onChange={handleChange}
                value={formData.title}
                required
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Describe the job…"
                onChange={handleChange}
                value={formData.notes}
                className="resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="customerId"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Customer
              </label>
              <select
                id="customerId"
                name="customerId"
                value={formData.customerId}
                required
                onChange={handleChange}
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="quote"
                  className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
                >
                  Quote
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 pink:text-pink-400 dark:text-zinc-400">
                    $
                  </span>
                  <input
                    type="number"
                    id="quote"
                    name="quote"
                    placeholder="0.00"
                    min={0}
                    step={0.01}
                    onChange={handleChange}
                    value={formData.quote}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-7 pr-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="status"
                  className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="startDate"
                  className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
                >
                  Start date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  onChange={handleChange}
                  value={formData.startDate}
                  required
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="endDate"
                  className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
                >
                  End date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  onChange={handleChange}
                  value={formData.endDate}
                  required
                  min={formData.startDate}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:[color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-5 pink:border-pink-100 dark:border-zinc-800">
              <Link
                to="/kanban"
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 pink:border-pink-200 pink:bg-pink-100 pink:text-pink-700 pink:hover:bg-pink-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-amber-400 pink:bg-pink-500 pink:hover:bg-pink-400"
              >
                {isEditing ? 'Save changes' : 'Create job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
