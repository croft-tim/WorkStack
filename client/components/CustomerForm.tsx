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
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Mark Riley"
                onChange={handleChange}
                value={formData.name}
                className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="address"
                className="text-xs font-medium text-zinc-400"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="e.g. 123 Queen Street, Auckland, 1023"
                onChange={handleChange}
                value={formData.address}
                className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-xs font-medium text-zinc-400"
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
                className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-zinc-400"
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
                className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm
           text-zinc-100 placeholder:text-zinc-600
           focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rating"
                className="text-xs font-medium text-zinc-400"
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
                placeholder="Extra notes about the customer"
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
                onClick={onCancel}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm
           font-medium text-zinc-400 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-400"
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
