import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import KanbanBoard from './components/KanbanBoard.tsx'

export default createRoutesFromElements(
  <Route path="/">
    <Route index element={<App />} />
    <Route path="kanban" element={<KanbanBoard />} />
  </Route>,
)
