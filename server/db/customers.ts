import db from './connection.ts'
import { Customer, CustomerData } from '../../models/customer.ts'

// const columns = ['name', 'address', 'phone', 'email', 'notes', 'rating']

export async function getCustomerById(id: number | string) {
  const customer = await db('customers').select().first().where({ id })
  return customer as Customer
}

export async function getCustomers() {
  const customer = await db('customers').select()
  return customer as Customer[]
}

export async function addCustomer(newCustomer: CustomerData): Promise<number> {
  const newCustomerArr = await db('customers')
    .insert({
      name: newCustomer.name,
      address: newCustomer.address,
      phone: newCustomer.phone,
      email: newCustomer.email,
      notes: newCustomer.notes,
      rating: newCustomer.rating,
    })
    .returning('id')
  return newCustomerArr[0].id
}
