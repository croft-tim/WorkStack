import { useNavigate, useSearchParams } from 'react-router'
import JobForm from '../components/JobForm'
import { JobData, JobStatus, statuses } from '../../models/job'
import { useAddJob } from '../hooks/useAddJob'

export default function NewJobPage() {
  const addJob = useAddJob()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const statusParam = searchParams.get('status')
  const initialStatus: JobStatus =
    statuses.find((status) => status === statusParam) ?? 'New'

  const handleSubmit = async (data: JobData) => {
    const id = await addJob.mutateAsync(data)
    navigate(`/jobs/${id}`)
  }

  return (
    <div>
      <h1>New Job</h1>
      <JobForm
        onSubmit={handleSubmit}
        initialData={{ status: initialStatus }}
      />
    </div>
  )
}
