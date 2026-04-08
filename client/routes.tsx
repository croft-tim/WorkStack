import { createRoutesFromElements, Route } from 'react-router'
import Layout from './components/Layout.tsx'
import App from './components/App.tsx'

export default createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<App />} />
import KanbanBoard from './components/KanbanBoard.tsx'
import Layout from './components/Layout.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="kanban" element={<KanbanBoard />} />
  </Route>,
)
