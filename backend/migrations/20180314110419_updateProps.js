
exports.up = function(knex, Promise) {
  return knex.schema.table('properties', function(table){
    table.text('prop_type');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('properties');
};
