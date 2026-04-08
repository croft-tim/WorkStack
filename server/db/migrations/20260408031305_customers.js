/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('customers', (table) => {
    table.increments('id')
    table.string('name')
    table.string('address')
    table.string('phone')
    table.string('email')
    table.string('notes')
    table.float('rating')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('customers')
}
