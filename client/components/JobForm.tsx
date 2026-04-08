import { useState } from 'react'

const defaultEventData = {
  tradieId: 'tradie_1',
  customerId: 'customer_1',
  status: 'new',
  title: '',
  quote: 0,
  notes: '',
  startDate: '',
  endDate: '',
}

const status = ['New', 'In Progress', 'Billed', 'Paid', 'Done']

export default function JobForm() {
  const [formData, setFormData] = useState(defaultEventData)

  function handleChange() {}

  function handleSubmit() {}

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="title" className="label">
        Job name:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Job name"
        onChange={handleChange}
        value={formData.title}
      />
      <label htmlFor="notes" className="label">
        Notes:
      </label>
      <input
        type="text"
        id="notes"
        name="notes"
        placeholder="Job description"
        onChange={handleChange}
        value={formData.notes}
      />
      <label htmlFor="quote" className="label">
        Job name:
      </label>
      <input
        type="text"
        id="quote"
        name="quote"
        placeholder="0.00"
        onChange={handleChange}
        value={formData.quote}
      />
      <label htmlFor="startDate" className="label">
        Status:
      </label>
      <select value={formData.status} onChange={handleChange}>
        {status.map((stt) => (
          <option key={stt} value={stt}>
            {stt}
          </option>
        ))}
      </select>
      <label htmlFor="startDate" className="label">
        Start date:
      </label>
      <input
        type="text"
        id="startDate"
        name="startDate"
        placeholder="dd/mm/yyyy"
        onChange={handleChange}
        value={formData.startDate}
      />
      <label htmlFor="endDate" className="label">
        End date:
      </label>
      <input
        type="text"
        id="endDate"
        name="endDate"
        placeholder="dd/mm/yyyy"
        onChange={handleChange}
        value={formData.endDate}
      />
      <button>Submit</button>
    </form>
  )
}
