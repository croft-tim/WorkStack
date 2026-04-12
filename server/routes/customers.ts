import { Router } from 'express'
// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'

import * as db from '../db/customers.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const jobs = await db.getCustomers()
    res.json(jobs)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'Invalid job id' })
      return
    }

    const job = await db.getCustomerById(id)

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

router.post('/', async (req, res, next) => {
  try {
    const newJob = req.body
    const job = await db.addCustomer(newJob)
    res.json(job)
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
      res.status(400).json({ message: 'Invalid customer id' })
      return
    }

    const updatedCustomerData = req.body
    const updatedCustomer = await db.updateCustomerById(id, updatedCustomerData)

    if (!updatedCustomer) {
      res.status(404).json({ message: 'Customer not found' })
      return
    }

    res.json(updatedCustomer)
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

    await db.deleteCustomerById(id)
    res.sendStatus(200)
    // .setHeader('Location', `${req.baseUrl}/${id}`)
    // .sendStatus(StatusCodes.NO_CONTENT)
  } catch (err) {
    next(err)
  }
})

//Do later
// router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
//   if (!req.auth?.sub) {
//     res.sendStatus(StatusCodes.UNAUTHORIZED)
//     return
//   }

//   try {
//     const { owner, name } = req.body
//     const id = await db.addFruit({ owner, name })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

export default router
