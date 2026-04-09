import { useNavigate } from 'react-router'
import JobForm from '../components/JobForm'
import { JobData } from '../../models/job'
import { useAddJob } from '../hooks/useAddJob'

export default function NewJobPage() {
  const navigate = useNavigate()

  const { mutate: addJob } = useAddJob()

  function handleSubmit(data: JobData) {
    addJob(data, { onSuccess: (id) => navigate(`/jobs/${id}`) })
  }

  return (
    <div>
      <h1>New Job</h1>
      <JobForm onSubmit={handleSubmit} />
    </div>
  )
}
