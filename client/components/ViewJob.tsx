import { Link, useParams } from 'react-router'
import { Job } from '../../models/job'

type ViewJobData = Job & {
  contactPerson: string
  contactEmail: string
  phone: string
  summary: string
  scope: string[]
  notes: string[]
}

const jobs: ViewJobData[] = [
  {
    id: 'JOB-001',
    title: 'Rewire Kitchen',
    client: 'Sarah Jenkins',
    location: '123 Oak St, Suburb',
    priority: 'High',
    status: 'Todo',
    dueDate: '2026-04-10',
    description:
      'Complete a full kitchen rewire including new power points, lighting updates, and switch replacements.',
    contactPerson: 'Sarah Jenkins',
    contactEmail: 'sarah.jenkins@email.com',
    phone: '021 555 1234',
    summary:
      'Kitchen renovation requires electrical rewiring before cabinetry installation begins.',
    scope: [
      'Inspect current kitchen wiring',
      'Install new wiring for appliances',
      'Add extra power outlets',
      'Replace light switches and fittings',
    ],
    notes: [
      'Client prefers morning updates',
      'Coordinate timing before cabinetry team arrives',
      'Confirm final appliance positions before starting',
    ],
  },
  {
    id: 'JOB-002',
    title: 'Install Solar Panels',
    client: 'David Miller',
    location: '45 Pine Ave, Heights',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-04-12',
    description:
      'Install rooftop solar panels and connect inverter system for residential property.',
    contactPerson: 'David Miller',
    contactEmail: 'david.miller@email.com',
    phone: '021 444 6789',
    summary:
      'Property is ready for panel installation. Final inspection needed after mounting is completed.',
    scope: [
      'Confirm roof measurements',
      'Install mounting brackets',
      'Fit solar panels',
      'Connect inverter and test system',
    ],
    notes: [
      'Roof access available from 8 AM',
      'Weather may affect installation timing',
    ],
  },
  {
    id: 'JOB-003',
    title: 'Emergency Leak Fix',
    client: 'Emily Chen',
    location: '78 River Rd, Downtown',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-04-09',
    description:
      'Urgent repair needed for active leak affecting interior wall and nearby flooring.',
    contactPerson: 'Emily Chen',
    contactEmail: 'emily.chen@email.com',
    phone: '021 333 2222',
    summary:
      'Emergency maintenance job requiring quick assessment and repair to prevent further damage.',
    scope: [
      'Locate source of leak',
      'Shut off affected supply if needed',
      'Repair damaged section',
      'Test water flow after repair',
    ],
    notes: [
      'Client requested urgent same-day communication',
      'Take photos before and after repair',
    ],
  },
  {
    id: 'JOB-004',
    title: 'Annual HVAC Checkup',
    client: 'Westside Office Park',
    location: '900 Business Pkwy',
    priority: 'Low',
    status: 'Review',
    dueDate: '2026-04-15',
    description:
      'Annual HVAC maintenance and inspection across the office park system.',
    contactPerson: 'Facilities Team',
    contactEmail: 'facilities@westsideofficepark.com',
    phone: '04 555 9090',
    summary:
      'Routine maintenance visit to inspect HVAC performance and identify any issues before winter.',
    scope: [
      'Inspect system filters',
      'Test thermostat controls',
      'Check airflow and vents',
      'Record maintenance findings',
    ],
    notes: [
      'Reception will provide access cards',
      'Maintenance report required after inspection',
    ],
  },
  {
    id: 'JOB-005',
    title: 'Bathroom Renovations',
    client: 'Robert Taylor',
    location: '12 Bluebay Dr',
    priority: 'Medium',
    status: 'Done',
    dueDate: '2026-04-05',
    description:
      'Electrical and finishing work completed as part of full bathroom renovation project.',
    contactPerson: 'Robert Taylor',
    contactEmail: 'robert.taylor@email.com',
    phone: '021 777 4545',
    summary:
      'Final stage of bathroom renovation completed and ready for handover review.',
    scope: [
      'Install updated fittings',
      'Finish electrical work',
      'Test lighting and fan system',
      'Complete final walkthrough',
    ],
    notes: [
      'Client requested copy of final work summary',
      'Job marked complete pending archived paperwork',
    ],
  },
]

export default function ViewJob() {
  const id = 'JOB-001'
  const job = jobs.find((job) => job.id === id)

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-zinc-100">
        <h1 className="text-2xl font-semibold">Job not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200"
        >
          Back to Board
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl p-6 text-zinc-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{job.id}</p>
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="mt-1 text-zinc-400">{job.client}</p>
        </div>

        <Link
          to="/"
          className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-700"
        >
          Back to Board
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 md:col-span-2">
          <h2 className="mb-3 text-xl font-semibold">Job Overview</h2>
          <p className="mb-4 text-zinc-300">{job.summary}</p>

          <h3 className="mb-2 text-lg font-medium">Description</h3>
          <p className="mb-5 text-zinc-400">{job.description}</p>

          <h3 className="mb-2 text-lg font-medium">Scope of Work</h3>
          <ul className="space-y-2 text-zinc-400">
            {job.scope.map((item) => (
              <li key={item} className="rounded-md bg-zinc-800/60 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-xl font-semibold">Details</h2>
            <div className="space-y-2 text-sm text-zinc-400">
              <p>
                <span className="font-medium text-zinc-200">Status:</span>{' '}
                {job.status}
              </p>
              <p>
                <span className="font-medium text-zinc-200">Priority:</span>{' '}
                {job.priority}
              </p>
              <p>
                <span className="font-medium text-zinc-200">Due Date:</span>{' '}
                {new Date(job.dueDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-zinc-200">Location:</span>{' '}
                {job.location}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-xl font-semibold">Client Contact</h2>
            <div className="space-y-2 text-sm text-zinc-400">
              <p>
                <span className="font-medium text-zinc-200">Name:</span>{' '}
                {job.contactPerson}
              </p>
              <p>
                <span className="font-medium text-zinc-200">Email:</span>{' '}
                {job.contactEmail}
              </p>
              <p>
                <span className="font-medium text-zinc-200">Phone:</span>{' '}
                {job.phone}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 text-xl font-semibold">Notes</h2>
            <ul className="space-y-2 text-sm text-zinc-400">
              {job.notes.map((note) => (
                <li key={note} className="rounded-md bg-zinc-800/60 px-3 py-2">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
