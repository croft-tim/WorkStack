import { useNavigate } from 'react-router'
import JobForm from '../components/JobForm'
import { JobData } from '../../models/job'
import { useAddJob } from '../hooks/useAddJob'

export default function NewJobPage() {
  const addJob = useAddJob()
  const navigate = useNavigate()

  const handleSubmit = async (data: JobData) => {
    const id = await addJob.mutateAsync(data)
    navigate(`/jobs/${id}`)
  }

  return (
    <div>
      <h1>New Job</h1>
      <JobForm onSubmit={handleSubmit} />
    </div>
  )
}
