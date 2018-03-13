
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.text('name').notNullable();
    table.text('city').notNullable().defaultTo('Austin');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
