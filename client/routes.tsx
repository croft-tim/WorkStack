import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import KanbanBoard from './components/KanbanBoard.tsx'
import Layout from './components/Layout.tsx'
import CustomerList from './components/CustomerList.tsx'
import NewJobPage from './components/NewJobPage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="kanban" element={<KanbanBoard />} />
    <Route path="customers" element={<CustomerList />} />
    <Route path="/jobs/new" element={<NewJobPage />} />
  </Route>,
)
