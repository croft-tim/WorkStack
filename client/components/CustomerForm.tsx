import { ChangeEvent, FormEvent, useState } from 'react'
import { Customer, CustomerData } from '../../models/customer'
import AddressAutocomplete from './AddressAutoComplete'

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
  onCancel?: () => void
}

export default function CustomerForm({
  initialData,
  onSubmit,
  onCancel,
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
      [name]: name === 'rating' ? Number(value) : value,
    }))
  }

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="min-h-screen bg-white p-8 transition-colors duration-300 pink:bg-pink-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-xs text-slate-500 pink:text-pink-700 dark:text-zinc-500">
            Customers / {isEditing ? 'Edit' : 'New'}
          </p>
          <h1 className="text-xl font-medium text-slate-800 pink:text-pink-900 dark:text-zinc-50">
            {isEditing ? 'Edit customer' : 'Create customer'}
          </h1>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 shadow-sm transition-colors pink:border-pink-200 pink:bg-pink-50 pink:shadow-pink-500/5 dark:border-zinc-800 dark:bg-zinc-800/50 dark:shadow-none">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Mark Riley"
                onChange={handleChange}
                value={formData.name}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <AddressAutocomplete
              value={formData.address}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  address: value,
                }))
              }
              label="Address"
              placeholder="e.g. 123 Queen Street, Auckland"
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="021 123 4567"
                onChange={handleChange}
                value={formData.phone}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="mark@gmail.com"
                onChange={handleChange}
                value={formData.email}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rating"
                className="text-xs font-medium text-slate-500 pink:text-pink-700 dark:text-zinc-400"
              >
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min={0}
                max={10}
                step={0.5}
                placeholder="0"
                onChange={handleChange}
                value={formData.rating}
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
                placeholder="Extra notes about the customer"
                onChange={handleChange}
                value={formData.notes}
                className="resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:outline-none pink:border-pink-200 pink:bg-white pink:text-pink-900 pink:placeholder:text-pink-300 pink:focus:border-pink-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-5 pink:border-pink-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 pink:border-pink-200 pink:bg-pink-100 pink:text-pink-700 pink:hover:bg-pink-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-amber-400 pink:bg-pink-700 pink:text-white pink:hover:bg-pink-600"
              >
                {isEditing ? 'Save changes' : 'Create customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
