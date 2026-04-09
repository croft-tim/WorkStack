import { ChangeEvent, FormEvent, useState } from 'react'
import { Customer, CustomerData } from '../../models/customer'

const defaultCustomerData: CustomerData = {
  name: '',
  address: '',
  phone: '',
  email: '',
  notes: '',
  rating: 0,
}

interface CustomerFormProps {
  initialData?: Partial<Customer>
  onSubmit: (data: CustomerData) => void
}

export default function CustomerForm({
  initialData,
  onSubmit,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerData>({
    ...defaultCustomerData,
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
            Customers / {isEditing ? 'Edit' : 'New'}
          </p>
          <h1 className="text-xl font-medium text-zinc-50">
            {isEditing ? 'Edit customer' : 'Create customer'}
          </h1>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-8 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
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
