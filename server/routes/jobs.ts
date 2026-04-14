import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'

import * as db from '../db/jobs.ts'
import * as tradieDb from '../db/tradies.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const jobs = await db.getJobs()
    res.json(jobs)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/search/:term', async (req, res, next) => {
  try {
    const query = req.params.term

    const customers = await db.getJobsSearch(query)

    if (customers == null) {
      res.status(204).json({ message: 'No results' })
      return
    } else {
      res.json(customers)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/customer/:id', async (req, res, next) => {
  try {
    const query = req.params.id

    const customers = await db.getJobsByCustomerId(query)

    if (customers == null) {
      res.status(204).json({ message: 'No results' })
      return
    } else {
      res.json(customers)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    // if (Number.isNaN(id)) {
    //   res.status(400).json({ message: 'Invalid job id' })
    //   return
    // }

    const job = await db.getJobById(id)

    if (job == null) {
      res.status(404).json({ message: 'Job not found' })
      return
    } else {
      res.json(job)
    }
  } catch (err) {
    next(err)
  }
})

//{ tradie_id, customer_id, status , title, problem , inspection , quote , notes , start_date ,  end_date}
router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  try {
    const auth0Id = req.auth?.sub
    let tradieId = 1

    if (auth0Id) {
      const tradie = await tradieDb.getTradieByAuth0Id(auth0Id)
      if (tradie) {
        tradieId = tradie.id
      }
    }

    const newJob = { ...req.body, tradieId: tradieId }
    const job = await db.addJob(newJob)
    res.status(201).json(job)
    // .setHeader('Location', `${req.baseUrl}/${id}`)
    // .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'Invalid job id' })
      return
    }

    const updatedJobData = req.body
    const updatedJob = await db.updateJobById(id, updatedJobData)
    res.json(updatedJob)
    // .setHeader('Location', `${req.baseUrl}/${id}`)
    // .sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'Invalid job id' })
      return
    }

    await db.deleteJobById(id)
    res.sendStatus(200)
    // .setHeader('Location', `${req.baseUrl}/${id}`)
    // .sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

export default router
