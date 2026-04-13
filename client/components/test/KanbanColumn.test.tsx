/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import KanbanColumn from '../KanbanColumn'
import { MemoryRouter } from 'react-router'

afterEach(() => {
  cleanup()
})

vi.mock('../KanbanCard', () => ({
  default: ({ job }: { job: { title: string } }) => <div>{job.title}</div>,
}))

function renderKanbanColumn(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('KanbanColumn', () => {
  it('renders the status, job count, and job titles', () => {
    const jobs = [
      {
        id: 1,
        title: 'Kitchen renovation',
        status: 'Quoted',
        quote: 2000,
        notes: 'Needs a quote update',
        startDate: '2026-04-01',
        endDate: '2026-04-10',
      },
      {
        id: 2,
        title: 'Bathroom repaint',
        status: 'Quoted',
        quote: 1200,
        notes: 'Waiting on approval',
        startDate: '2026-04-02',
        endDate: '2026-04-08',
      },
    ]

    renderKanbanColumn(<KanbanColumn status="Quoted" jobs={jobs} />)

    expect(screen.getByText('Quoted')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Kitchen renovation')).toBeInTheDocument()
    expect(screen.getByText('Bathroom repaint')).toBeInTheDocument()
  })

  it('renders the empty message when there are no jobs', () => {
    renderKanbanColumn(<KanbanColumn status="Completed" jobs={[]} />)

    expect(screen.getByText('No jobs in Completed')).toBeInTheDocument()
  })

  it('does not render the empty message when jobs exist', () => {
    const jobs = [
      {
        id: 1,
        title: 'Kitchen renovation',
        status: 'Quoted',
        quote: 2000,
        notes: 'Needs a quote update',
        startDate: '2026-04-01',
        endDate: '2026-04-10',
      },
    ]

    renderKanbanColumn(<KanbanColumn status="Quoted" jobs={jobs} />)

    expect(screen.queryByText('No jobs in Quoted')).not.toBeInTheDocument()
  })

  it('renders the status as an h2 heading', () => {
    renderKanbanColumn(<KanbanColumn status="Completed" jobs={[]} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Completed' }),
    ).toBeInTheDocument()
  })

  it('renders the action button', () => {
    renderKanbanColumn(<KanbanColumn status="New" jobs={[]} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
