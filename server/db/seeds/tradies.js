export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tradies').del()

  // Inserts seed entries
  await knex('tradies').insert([
    {
      id: 1,
      name: 'Johnno',
    },
  ])
}
