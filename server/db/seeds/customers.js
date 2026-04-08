import { faker } from '@faker-js/faker'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()

  // Inserts seed entries
  // await knex('customers').insert([
  //   {
  //     id: 1,
  //     name: 'Jessie',
  //     address: '69 place over there',
  //     phone: '0210231212',
  //     email: 'real@beanmail.com',
  //     notes: '',
  //     rating: 7.5,
  //   },
  // ])

  // Insert seeds
  const people = Array.from({ length: 15 }).map((_, i) => {
    const name = faker.person.fullName()
    return {
      id: i,
      name: name,
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: 'international' }),
      email: faker.internet.email({ firstName: name }),
      notes: '',
      rating: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),
    }
  })
  await knex('customers').insert(people)
}
