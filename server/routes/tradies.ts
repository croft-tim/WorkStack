import { Router } from 'express'
import * as db from '../db/tradies.ts'
import { JwtRequest } from '../auth0.ts'
import checkJwt from '../auth0.ts'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) return res.status(401).json({ message: 'Unauthorized' })

    const tradie = await db.getTradieByAuth0Id(auth0Id)
    if (!tradie) return res.status(404).json({ message: 'Tradie not found' })

    res.json(tradie)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const name = req.body.name as string

    if (!auth0Id) return res.status(401).json({ message: 'Unauthorized' })

    let tradie = await db.getTradieByAuth0Id(auth0Id)

    if (!tradie) {
      tradie = await db.addTradie({ auth0Id, name })
    }

    res.json(tradie)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
