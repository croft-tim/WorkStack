import { statuses } from '../../models/job'
import { mockJobs } from '../data/mockJobs'
import KanbanColumn from './KanbanColumn'

export default function KanbanBoard() {
  return (
    <div className="flex h-full flex-col bg-zinc-950 font-sans text-zinc-100">
      {/* Board Content */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden bg-zinc-950 px-8 py-6">
        <div className="flex h-full gap-6">
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              jobs={mockJobs.filter((job) => job.status === status)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
