import { useNavigate } from 'react-router'
import JobForm from '../components/JobForm'
import { JobData } from '../../models/job'

export default function NewJobPage() {
  const navigate = useNavigate()

  async function handleSubmit(data: JobData) {
    await createJob(data) // your API call here
    navigate('/jobs')
  }

  return (
    <div>
      <h1>New Job</h1>
      <JobForm onSubmit={handleSubmit} />
    </div>
  )
}
