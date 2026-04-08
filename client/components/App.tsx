import { useFruits } from '../hooks/useFruits.ts'
import JobSummary from './Job.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <div className="mt-6 flex flex-col gap-4">
          <JobSummary title="Job 1" dueDate="9/4" status="Awaiting Payment" />
          <JobSummary title="Job 2" dueDate="12/4" status="In Progress" />
        </div>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
    </>
  )
}

export default App
