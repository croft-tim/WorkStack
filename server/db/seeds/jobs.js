import { faker } from '@faker-js/faker'
import { statuses } from '../../../models/job'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('jobs').del()

  const jobs = [
    {
      id: 1,
      tradie_id: 1,
      customer_id: 1,
      status: 'Quoted',
      title: 'Broken Faucet',
      quote: 85,
      notes: '',
      start_date: '2026-04-08',
      end_date: '2026-04-12',
    },
  ]

  // const statuses = ['Awaiting inspection', 'In progress', 'Completed', 'Awaiting parts', 'Cancelled']

  for (let i = 2; i <= 10; i++) {
    const startDate = faker.date.between({
      from: '2026-01-01',
      to: '2026-06-30',
    })
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + faker.number.int({ min: 1, max: 14 }))

    jobs.push({
      id: i,
      tradie_id: 1, // Currently only one tradie in seeds
      customer_id: faker.number.int({ min: 0, max: 14 }), // 0 to 14 from customers seed
      status: faker.helpers.arrayElement(statuses),
      title: faker.commerce.productName() + ' Repair',
      quote: faker.number.int({ min: 50, max: 1000 }),
      notes: faker.lorem.sentence(),
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    })
  }

  // Inserts seed entries
  await knex('jobs').insert(jobs)
}
