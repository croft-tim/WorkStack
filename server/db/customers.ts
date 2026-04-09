import db from './connection.ts'
import { Customer, CustomerData } from '../../models/customer.ts'

export async function getCustomerById(id: number | string) {
  const customer = await db('customers').select().first().where({id})
  return customer as Customer
}