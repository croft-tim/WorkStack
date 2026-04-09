import { useNavigate } from 'react-router'
import JobForm from '../components/JobForm'
import { JobData } from '../../models/job'
import { addJob } from '../apis/jobs'

export default function NewJobPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: JobData) {
    const id = await addJob(data) // your API call here
    navigate(`/jobs/${id}`)
  }

  return (
    <div>
      <h1>New Job</h1>
      <JobForm onSubmit={handleSubmit} />
    </div>
  )
}
