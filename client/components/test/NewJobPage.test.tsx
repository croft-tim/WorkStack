//@vitest-environment jsdom
import {
  describe,
  it,
  expect,
  beforeAll,
  vi,
  afterEach,
  beforeEach,
} from 'vitest'
import nock from 'nock'
import { renderRoute } from '../../test/setup.tsx'
import { JobData } from '../../../models/job.ts'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(() => {
  nock('http://localhost:3000')
    .get('/api/v1/customers')
    .reply(200, customers)
    .persist()
})

afterEach(() => {
  vi.clearAllMocks()
})

const newJob: JobData = {
  tradieId: 1,
  customerId: 1,
  status: 'New',
  title: 'Repair sink',
  quote: 200,
  notes: 'Repair main bathroom sink',
  startDate: '15/04/2026',
  endDate: '16/04/2026',
}

const customers = [
  {
    id: 1,
    name: 'Jessie Wakefield',
    address: '47 Shortland Street, Auckland',
    phone: '0210231212',
    email: 'jessie_wakefield@beanmail.com',
    notes: 'Recommended by Jim, wanting to do a kitchen upgrade.',
    rating: 7.5,
  },
  {
    id: 2,
    name: 'Lloyd Padberg',
    address: '809 Logan Brooks',
    phone: '+14633274147',
    email: 'LloydPadberg_Gislason9@yahoo.com',
    notes:
      'Interested in a bathroom remodel, specifically looking for modern fixtures.',
    rating: 7.25,
  },
]

describe('NewJobPage', () => {
  it('renders all form fields', async () => {
    const screen = renderRoute('/jobs/new')

    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^customer$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/quote/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument()
  })

  it('renders the submit button with correct label', async () => {
    const screen = renderRoute('/jobs/new')

    expect(
      screen.getByRole('button', { name: 'Create job' }),
    ).toBeInTheDocument()
  })

  it('renders customers in the customer dropdown', async () => {
    const screen = renderRoute('/jobs/new')

    expect(
      await screen.findByRole('option', { name: 'Jessie Wakefield' }),
    ).toBeInTheDocument()
  })

  it('renders a cancel link', async () => {
    const screen = renderRoute('/jobs/new')

    expect(screen.getByRole('link', { name: 'Cancel' })).toBeInTheDocument()
  })
})
