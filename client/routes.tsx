import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import KanbanBoard from './components/KanbanBoard.tsx'
import Layout from './components/Layout.tsx'
import CustomerList from './components/CustomerList.tsx'
import CustomerView from './components/CustomerView.tsx'
import NewJobPage from './components/NewJobPage.tsx'
import ViewJob from './components/ViewJob.tsx'
import NewCustomerPage from './components/NewCustomerPage.tsx'
import EditCustomerPage from './components/EditCustomerPage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* <Route index element={<App />} /> */}
    <Route index element={<KanbanBoard />} />
    <Route path="kanban" element={<KanbanBoard />} />
    <Route path="customers" element={<CustomerList />} />
    <Route path="customer/:id" element={<CustomerView />} />
    <Route path="jobs/new" element={<NewJobPage />} />
    <Route path="jobs/:id" element={<ViewJob />} />
    <Route path="customers/new" element={<NewCustomerPage />} />
    <Route path="customer/:id/edit" element={<EditCustomerPage />} />
  </Route>,
)
