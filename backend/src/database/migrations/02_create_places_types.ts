import Knex from 'knex';

export async function up(knex: Knex) {
  // Criar tabela
  return knex.schema.createTable('places_types', table => {
    table.increments('id').primary();
    table.integer('place_id').notNullable().references('id').inTable('places');
    table.integer('type_id').notNullable().references('id').inTable('types');
  });
}

export async function down(knex: Knex) {
  // Deletar a tabela
  return knex.schema.dropTable('places_types');
}