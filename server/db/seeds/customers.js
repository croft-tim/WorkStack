export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('customers').del()

  // Inserts seed entries
  await knex('customers').insert([
    {
      id: 1,
      name: 'Jessie',
      address: '69 place over there',
      phone: '0210231212',
      email: 'real@beanmail.com',
      notes: '',
      rating: 7.5,
    },
  ])
}
