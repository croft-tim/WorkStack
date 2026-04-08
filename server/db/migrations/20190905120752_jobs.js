/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('id')
    table.integer('tradie_id')
    table.integer('customer_id')
    table.string('status')
    table.string('title')
    table.string('problem')
    table.string('inspection')
    table.integer('quote')
    table.string('notes')
    table.date('start_date')
    table.date('end_date').defaultTo('null')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('jobs')
}
