type JobSummaryProps = {
  title: string
  dueDate: string
  status: string
}

export default function JobSummary({
  title,
  dueDate,
  status,
}: JobSummaryProps) {
  return (
    <div className="flex w-full items-center justify-between gap-6 rounded-md border border-zinc-400 bg-zinc-100 p-4">
      <div className="flex min-w-[180px] items-center gap-4">
        <h2 className="text-3xl font-medium">{title}</h2>
        <p className="text-lg text-zinc-700">Due: {dueDate}</p>
      </div>

      <div className="flex min-w-[260px] flex-col items-end gap-3">
        <p className="text-lg text-zinc-800">Status : {status}</p>

        <div className="flex gap-4">
          <button className="rounded-md border border-zinc-700 bg-white px-4 py-2 text-lg shadow-sm transition hover:bg-zinc-50">
            Change Status
          </button>

          <button className="rounded-md border border-zinc-700 bg-white px-6 py-2 text-lg shadow-sm transition hover:bg-zinc-50">
            Open
          </button>
        </div>
      </div>
    </div>
  )
}
