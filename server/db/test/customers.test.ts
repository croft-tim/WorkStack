import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection'
import { getCustomers, getCustomerById, addCustomer } from '../customers'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('GET /customers', () => {
  it('returns all customers', async () => {
    const customers = await getCustomers()

    expect(customers.length).toBeGreaterThan(0)

    expect(customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          address: expect.any(String),
          phone: expect.any(String),
          email: expect.any(String),
          notes: expect.any(String),
          rating: expect.any(Number),
        }),
      ]),
    )
  })
})

describe('GET /customers/:id', () => {
  it('returns a single customer', async () => {
    const customer = await getCustomerById(1)

    expect(customer).toMatchObject({
      id: 1,
      name: expect.any(String),
      address: expect.any(String),
      phone: expect.any(String),
      email: expect.any(String),
      notes: expect.any(String),
      rating: expect.any(Number),
    })
  })
})

describe('POST /customers/new', () => {
  it('creates a new customer and returns id', async () => {
    const newCustomer = {
      name: 'John Doe',
      address: '123 Queen Street',
      phone: '0211111111',
      email: 'john@example.com',
      notes: 'Test customer',
      rating: 8.5,
    }

    const id = await addCustomer(newCustomer)

    expect(id).toBeDefined()
    expect(typeof id).toBe('number')

    // ✅ verify in DB
    const createdCustomer = await getCustomerById(id)

    expect(createdCustomer).toMatchObject({
      id,
      ...newCustomer,
    })
  })
})
