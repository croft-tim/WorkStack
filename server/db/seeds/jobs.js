import { faker } from '@faker-js/faker'

// Create 15 jobs and attach them to a random customer
// Job id 1 is hard coded
// Status, title and notes are hard coded

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('jobs').del()

  const statuses = ['New', 'Quoted', 'In Progress', 'Invoiced', 'Completed']
  // const statuses = ['Awaiting inspection', 'In progress', 'Completed', 'Awaiting parts', 'Cancelled']

  // Hard coded title
  const title = [
    'Rewire Kitchen',
    'Install Solar Panels',
    'Emergency Leak Fix',
    'Annual HVAC Checkup',
    'Bathroom Renovations',
    'Exterior House Painting',
    'Garage Electrical Repair',
    'Drain Clearing Service',
    'Paving Backyard Pathway',
    'Install New Smart Locks',
    'Kitchen Cabinet Installation',
    'Roof Tile Replacement',
    'Install Hot Water Cylinder',
    'Fence Repair and Painting',
  ]

  const notes = [
    'Replace old wiring, need new circuit breakers, electrical cables, and outlets.',
    'Rooftop installation, requires solar panels, mounting rails, and inverter system.',
    'Patch pipe burst, need copper piping, compression fittings, and waterproof sealant.',
    'Routine system service, need air filters, cleaning solution, and refrigerant check tool.',
    'Full refit, requires waterproof wallboard, tiling adhesive, grout, and silicone sealant.',
    'Prep and paint walls, need weather-resistant paint, painter’s tape, and primer.',
    'Fix faulty lighting circuits, need insulated wiring, wire nuts, and LED fixtures.',
    'Unclog kitchen sink drain, requires drain snake, high-pressure water nozzle, and pipe cleaner.',
    'Lay garden pavers, need paving stones, leveling sand, and concrete edgers.',
    'Fit modern digital lock, requires smart lock kit, lithium batteries, and drill bit.',
    'Mount overhead units, need wood screws, wall anchors, and a spirit level.',
    'Swap cracked tiles, requires replacement clay tiles, tile cement, a ladder and safety harness.',
    'Fit new water tank, need tank insulation, inlet / outlet valves, and pipe lagging.',
    'Fix broken slats, requires timber slats, nails, exterior wood paint, and brushes.',
  ]

  const jobs = [{
    id: 1,
    tradie_id: 1,
    customer_id: 1,
    status: 'Quoted',
    title: 'Replace Broken Faucet',
    quote: 85,
    notes: 'Replace kitchen faucet, need a new chrome-finish mixer tap and Teflon tape.',
    start_date: '2026-04-08',
    end_date: '2026-04-12',
  }]

  for (let i = 0; i < 14; i++) {
    const startDate = faker.date.between({ from: '2026-01-01', to: '2026-06-30', })
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + faker.number.int({ min: 1, max: 14 }))

    jobs.push({
      id: i + 2,
      tradie_id: 1, // Currently only one tradie in seeds
      customer_id: faker.number.int({ min: 1, max: 25 }), // 1 to 25 from customers seed
      status: faker.helpers.arrayElement(statuses),
      title: title[i],
      quote: faker.number.int({ min: 50, max: 1000 }),
      notes: notes[i],
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    })
  }

  // Inserts seed entries
  await knex('jobs').insert(jobs)
}
