import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('types').insert([
    { title: 'Praia', image: 'praia.svg'},
    { title: 'Sítio Histórico', image: 'historico.svg'},
    { title: 'Restauração', image: 'restauracao.svg'},
    { title: 'Natureza', image: 'natureza.svg'},
    { title: 'Parque', image: 'parque.svg'},
    { title: 'Evento', image: 'evento.svg'},
    { title: 'Museu', image: 'museu.svg'},
    { title: 'Centro Comercial', image: 'comercial.svg'},
  ]);
}