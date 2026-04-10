import { faker } from '@faker-js/faker'

// Create 25 customers, the first one [1] is hard coded. Customers [2] to [16] have hard coded notes.

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()

  // Hard coded notes
  const notes = [
    'Interested in a bathroom remodel, specifically looking for modern fixtures.',
    'Regular customer, always prefers morning appointments.',
    'Reported an intermittent leak in the laundry room; needs urgent attention.',
    'Mentioned they have a large dog, please ensure gates are latched.',
    'Looking for a full HVAC system service before the winter season.',
    'Referred by a neighbor; interested in exterior painting.',
    'Very detail-oriented, appreciates a follow-up call after completion.',
    'Needs access via the side gate as the front door lock is temperamental.',
    'Considering a solar panel installation, requested an initial consultation.',
    'Reported an electrical issue in the garage; lights flickering occasionally.',
    'Prefers to be contacted via text message for appointment reminders.',
    'Planning a backyard landscaping project, looking for paving quotes.',
    'Previous work done was excellent; specifically requested the same tradie.',
    'Has a gated driveway; security code for entry is 1234.',
    'Looking for routine plumbing maintenance and drain clearing.'
  ]
  // Hard coded customer 0
  const people = [{
    id: 1,
    name: 'Jessie Wakefield',
    address: '47 Shortland Street, Auckland',
    phone: '0210231212',
    email: 'jessie_wakefield@beanmail.com',
    notes: 'Recommended by Jim, wanting to do a kitchen upgrade.',
    rating: 7.5,
  }]

  // Faker data for 24 customers
  const randomPeople = Array.from({ length: 24 }).map((_, i) => {
    const currentId = i + 2
    const name = faker.person.fullName()
    return {
      id: currentId,
      name: name,
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: 'international' }),
      email: faker.internet.email({ firstName: name }),
      notes: (currentId < 17 ? notes[i] : ''),
      rating: faker.number.float({ multipleOf: 0.25, min: 3, max: 10 }),
    }
  })

  people.push(...randomPeople)

  // Insert seeds
  await knex('customers').insert(people)
}
