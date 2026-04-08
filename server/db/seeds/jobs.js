export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('jobs').del()

  // Inserts seed entries
  await knex('jobs').insert([
    {
      id: 1,
      tradie_id: 1,
      customer_id: 1,
      status: 'Awaiting inspection',
      title: 'Broken Faucet',
      problem: 'Customer states that the faucet is broken? Inspection required',
      inspection: 'Found valve to be siezed, replacment ordered.',
      quote: 85,
      notes: '',
      start_date: '2026-04-08',
      end_date: '2026-04-12',
    },
  ])
}
