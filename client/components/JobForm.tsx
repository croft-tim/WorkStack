import { ChangeEvent, FormEvent, useState } from 'react'
import { Job, JobData, statuses } from '../../models/job'

const defaultJobData: JobData = {
  tradieId: 1,
  customerId: 1,
  status: 'New',
  title: '',
  quote: 0,
  notes: '',
  startDate: '',
  endDate: '',
}

interface JobFormProps {
  initialData?: Partial<Job>
  onSubmit: (data: JobData) => void
}

export default function JobForm({ initialData, onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState<JobData>({
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

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-xs text-zinc-500">
            Jobs / {isEditing ? 'Edit' : 'New'}
          </p>
          <h1 className="text-xl font-medium text-zinc-50">
            {isEditing ? 'Edit job' : 'Create job'}
          </h1>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-8 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="title"
                className="text-xs font-medium text-zinc-400"
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
                className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="text-xs font-medium text-zinc-400"
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
                className="resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="quote"
                  className="text-xs font-medium text-zinc-400"
                >
                  Quote
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
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
                    className="rounded-lg border border-zinc-700 bg-zinc-950 py-2 pl-7 pr-3 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="status"
                  className="text-xs font-medium text-zinc-400"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
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
                  className="text-xs font-medium text-zinc-400"
                >
                  Start date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  onChange={handleChange}
                  value={formData.startDate}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 [color-scheme:dark]
           placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="endDate"
                  className="text-xs font-medium text-zinc-400"
                >
                  End date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  onChange={handleChange}
                  value={formData.endDate}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 [color-scheme:dark]
           placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-800 pt-5">
              <button
                type="button"
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm
           font-medium text-zinc-400 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-400"
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
