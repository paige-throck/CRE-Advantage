
exports.up = function(knex, Promise) {
  return knex.schema.table('properties', function(table){
    table.float('prop_range');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('properties');
};
