import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from 'vitest'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import connection from '../../db/connection.ts'
import server from '../../server.ts'

vi.mock('../../auth0.ts', () => ({
  default: (req: any, res: any, next: any) => {
    req.auth = { sub: 'auth0|123' }
    next()
  },
}))

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('GET /', () => {
  it('gets an array of jobs', async () => {
    const res = await request(server).get('/api/v1/jobs')

    expect(res.statusCode).toBe(StatusCodes.OK)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          tradieId: expect.any(Number),
          customerId: expect.any(Number),
          status: expect.any(String),
          title: expect.any(String),
          quote: expect.any(Number),
          notes: expect.any(String),
          startDate: expect.any(String),
          endDate: expect.any(String),
          address: expect.any(String),
        }),
      ]),
    )
    expect(res.body[0].id).not.toBe(res.body[1].id)
  })
})

describe('GET /api/v1/jobs/:id', () => {
  it('should get a single job object', async () => {
    const res = await request(server).get('/api/v1/jobs/1')

    expect(res.statusCode).toBe(StatusCodes.OK)
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      tradieId: expect.any(Number),
      customerId: expect.any(Number),
      status: expect.any(String),
      title: expect.any(String),
      quote: expect.any(Number),
      notes: expect.any(String),
      startDate: expect.any(String),
      endDate: expect.any(String),
      address: expect.any(String),
    })
  })
})

describe('POST /api/v1/jobs', () => {
  it('creates a new job', async () => {
    const newJob = {
      tradieId: 1,
      customerId: 1,
      status: 'New',
      title: 'Fix roof leak',
      quote: 500,
      notes: 'Urgent repair',
      startDate: '2026-04-20',
      endDate: '2026-04-21',
    }

    const res = await request(server).post('/api/v1/jobs').send(newJob)

    expect(res.statusCode).toBe(StatusCodes.CREATED)
    expect(res.body).toEqual(expect.any(Number))

    const newJobId = res.body

    const getRes = await request(server).get(`/api/v1/jobs/${newJobId}`)

    expect(getRes.body).toMatchObject({
      id: newJobId,
      ...newJob,
    })
  })
})

describe('PATCH /api/v1/jobs/:id', () => {
  it('updates a job', async () => {
    const updatedData = {
      title: 'Updated title',
      quote: 999,
    }

    await request(server).patch('/api/v1/jobs/1').send(updatedData)

    const res = await request(server).get('/api/v1/jobs/1')

    expect(res.body.title).toBe('Updated title')
    expect(res.body.quote).toBe(999)
  })
})

describe('DELETE /api/v1/jobs/:id', () => {
  it('deletes a job', async () => {
    const deleteRes = await request(server).delete('/api/v1/jobs/1')
    expect(deleteRes.statusCode).toBe(StatusCodes.OK)

    const getRes = await request(server).get('/api/v1/jobs/1')
    expect(getRes.statusCode).toBe(StatusCodes.NOT_FOUND)
  })
})
