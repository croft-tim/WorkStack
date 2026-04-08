import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/fruits.ts'

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

router.get('/:id', async (req, res, next) => {
  try {
    const job = await db.getJobById(req.params.id)
    if (job == null) {
      res.status(404)
      next()
    } else {
      res.json(job)
    }
  } catch (err) {
    next(err)
  }
})

//{ tradie_id, customer_id, status , title, problem , inspection , quote , notes , start_date ,  end_date}
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const id = await db.addJob(data)
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

router.patch('/', async (req, res, next) => {
  try {
    const data = req.body
    const id = await db.updateJobById(data)
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const data = req.body
    const id = await db.addjob(data)
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

//Do later
router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const { owner, name } = req.body
    const id = await db.addFruit({ owner, name })
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

export default router
