import db from './connection.ts'
import { Customer } from '../../models/customer.ts'

export async function getCustomerById(id: number | string) {
  const customer = await db('customers').select().first().where({ id })
  return customer as Customer
}

export async function getCustomers() {
  const customer = await db('customers').select()
  return customer as Customer[]
}
