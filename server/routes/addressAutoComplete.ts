import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const router = express.Router()

const APIKEY = process.env.GEOAPIFY_API

router.get('/autocomplete', async (req, res) => {
  try {
    const text = req.query.text as string
    console.log(APIKEY)

    if (!text || text.length < 5) {
      return res.json({ features: [] })
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      text,
    )}&filter=countrycode:nz&apiKey=${APIKEY}`

    const response = await fetch(url)
    const data = await response.json()

    return res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch address suggestions' })
  }
})

export default router
