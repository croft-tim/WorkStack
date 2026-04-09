import express from 'express'
import * as Path from 'node:path'

import jobRoutes from './routes/jobs.ts'
import customerRoutes from './routes/customers.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/jobs', jobRoutes)
server.use('/api/v1/customers', customerRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
