/**
 * @param {import('knex').Knex} knex
 */

export async function up(knex) {
  await knex.schema.alterTable('tradies', (table) => {
    table.string('auth0_id').unique().nullable()
  })
}

export async function down(knex) {
  await knex.schema.alterTable('tradies', (table) => {
    table.dropColumn('auth0_id')
  })
}
