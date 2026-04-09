import { faker } from '@faker-js/faker'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()

  // Hard coded customer 0
  const people = [{
    id: 0,
    name: 'Jessie Wakefield',
    address: '47 Shortland Street, Auckland',
    phone: '0210231212',
    email: 'jessie_wakefield@beanmail.com',
    notes: 'Recommended by Jim, wanting to do a kitchen upgrade.',
    rating: 7.5,
  }]

  // Insert seeds
  const randomPeople = Array.from({ length: 15 }).map((_, i) => {
    const name = faker.person.fullName()
    return {
      id: i + 1,
      name: name,
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: 'international' }),
      email: faker.internet.email({ firstName: name }),
      notes: '',
      rating: faker.number.float({ multipleOf: 0.25, min: 0, max: 10 }),
    }
  })

  people.push(...randomPeople)
  console.log(people)

  await knex('customers').insert(people)
}
