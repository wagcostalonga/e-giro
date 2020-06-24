import Knex from 'knex';

export async function up(knex: Knex) {
  // Criar tabela
  return knex.schema.createTable('places', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('website').nullable;
    table.string('phone').nullable;
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('district').notNullable();
    table.string('council').notNullable();
  });
}

export async function down(knex: Knex) {
  // Deletar a tabela
  return knex.schema.dropTable('places');
}