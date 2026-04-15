// This comment makes the test to run in a fake browser environment
/**
 * @vitest-environment jsdom
 */

import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomerForm from '../CustomerForm'

afterEach(() => {
  cleanup()
})

vi.mock('../AddressAutoComplete', () => ({
  default: ({
    value,
    onChange,
    label,
  }: {
    value: string
    onChange: (value: string) => void
    label: string
  }) => (
    <div>
      <label htmlFor="mock-address">{label}</label>
      <input
        id="mock-address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}))

// It proves the component renders the expected fields and correct submit button text in “new customer” mode.
describe('CustomerForm', () => {
  it('renders the create customer form fields', () => {
    render(<CustomerForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /create customer/i }),
    ).toBeInTheDocument()
  })

  it('submits entered form data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<CustomerForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/name/i), 'Jane Smith')
    await user.type(screen.getByLabelText(/address/i), '123 Queen Street')
    await user.type(screen.getByLabelText(/phone/i), '0211234567')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.clear(screen.getByLabelText(/rating/i))
    await user.type(screen.getByLabelText(/rating/i), '8')
    await user.type(screen.getByLabelText(/notes/i), 'Prefers morning visits')

    await user.click(screen.getByRole('button', { name: /create customer/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane Smith',
      address: '123 Queen Street',
      phone: '0211234567',
      email: 'jane@example.com',
      notes: 'Prefers morning visits',
      // Rating is converted to a number, not left as a string
      rating: 8,
    })
  })

  // Edit mode testing
  it('renders edit mode when initialData is provided', () => {
    render(
      <CustomerForm
        initialData={{
          id: 1,
          name: 'Mark Riley',
          address: '50 Albert Street',
          phone: '0210000000',
          email: 'mark@example.com',
          notes: 'Existing customer',
          rating: 7,
        }}
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getByDisplayValue('Mark Riley')).toBeInTheDocument()
    expect(screen.getByDisplayValue('mark@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('50 Albert Street')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /save changes/i }),
    ).toBeInTheDocument()
  })

  it('calls onCancel when cancel is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()

    render(<CustomerForm onSubmit={vi.fn()} onCancel={onCancel} />)

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(onCancel).toHaveBeenCalled()
  })
})
