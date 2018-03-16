
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('suites',function(table) {
    table.increments('id');
    table.integer('prop_id').references('properties.id').onDelete('cascade');
    table.text('suite_num').notNullable();
    table.text('tenant');
    table.integer('suite_size');
    table.float('rental_rate');
    table.string('lease_date');
  })
  .then(function(){
    return knex.schema.createTableIfNotExists('property_notes', function(table) {
      table.increments('id');
      table.integer('prop_id').references('properties.id').onDelete('cascade');
      table.specificType('notes', 'text[]');
    })
    .then(function(){
      return knex.schema.createTableIfNotExists('documents', function(table){
        table.increments('id');
        table.integer('prop_id').references('properties.id').onDelete('cascade');
        table.string('doc_url').notNullable();
      })
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('suites')
  .then(function(){
    return knex.schema.dropTableIfExists('property_notes')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('documents');
  })
};
