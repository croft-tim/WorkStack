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

  // Hard coded addresses
  const addresses = [
    '101 Queen Street, Auckland CBD, Auckland 1010',
    '60 Cashel Street, Christchurch 8013',
    '152 Willis Street, Te Aro, Wellington 6011',
    '89 Courtenay Place, Te Aro, Wellington 6011',
    '23 Worcester Boulevard, Christchurch Central City, Christchurch 8011',
    '75 Riccarton Road, Riccarton, Christchurch 8041',
    '33 George Street, Dunedin Central, Dunedin 9016',
    '109 Princes Street, Dunedin Central, Dunedin 9016',
    '55 Victoria Street, Hamilton Central, Hamilton 3204',
    '200 Grey Street, Hamilton East, Hamilton 3216',
    '18 Marine Parade, Mount Maunganui, Tauranga 3116',
    '42 Cameron Road, Tauranga Central, Tauranga 3110',
    '88 High Street, Lower Hutt, Wellington 5010',
    '15 Paraparaumu Beach Road, Paraparaumu 5032',
    '62 Bridge Street, Nelson Central, Nelson 7010',
    '9 Trafalgar Street, Nelson Central, Nelson 7010',
    '25 Emerson Street, Napier South, Napier 4110',
    '11 Marine Parade, Napier South, Napier 4110',
    '90 Devon Street West, New Plymouth Central, New Plymouth 4310',
    '1 Ariki Street, New Plymouth Central, New Plymouth 4310',
    '58 Dee Street, Invercargill Central, Invercargill 9810',
    '21 Tay Street, Invercargill Central, Invercargill 9810',
    '45 Whangaparaoa Road, Red Beach, Whangaparaoa 0932',
    '103 Great North Road, Winton, Southland 9720'
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
      address: (addresses[i]),
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
