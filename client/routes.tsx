import { createRoutesFromElements, Route } from 'react-router'
import Layout from './components/Layout.tsx'
import App from './components/App.tsx'

export default createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<App />} />
  </Route>,
)
