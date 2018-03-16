
exports.up = function(knex, Promise) {
return knex.schema.createTableIfNotExists('properties', function(table){
    table.increments('id');
    table.integer('user_id').references('users.id').onDelete('cascade');
    table.text('address').notNullable();
    table.text('prop_owner');
    table.integer('num_suites');
    table.integer('prop_size');
    table.float('lat');
    table.float('lang');
    table.boolean('prospective_prop').defaultTo(false);
  })
  .then(function(){
    return knex.schema.createTableIfNotExists('tasks', function(table){
      table.increments('id');
      table.integer('user_id').references('users.id').onDelete('cascade');
      table.text('item').notNullable();
      table.date('task_date');
      table.boolean('completed').defaultTo(false);
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('properties')
  .then(function(){
    return knex.schema.dropTableIfExists('tasks')
  })
};
