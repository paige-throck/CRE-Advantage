let propIds = [];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('suites').del()
  .then(function(){
    return knex('property_notes').del()
  })
    .then(function(){
      return knex.select('id').from('properties')
    })
    .then(function(propId){
    propId.forEach(function(element){
        let index = 0;
        let key = Object.keys(element)[index];
        val = element[key];
        propIds.push(val);
      })
      return knex('suites').insert([
        {prop_id:propIds[0], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[0], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[1], suite_num:'400', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2019' },
        {prop_id:propIds[1], suite_num:'500', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'June 06, 2020' },

        {prop_id:propIds[2], suite_num:'200', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2019' },
        {prop_id:propIds[2], suite_num:'210', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'June 06, 2020' },

        {prop_id:propIds[3], suite_num:'400', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2019' },
        {prop_id:propIds[3], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'June 06, 2020' },

        {prop_id:propIds[4], suite_num:'400', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2019' },
        {prop_id:propIds[4], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'June 06, 2020' },

        {prop_id:propIds[5], suite_num:'400', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2019' },
        {prop_id:propIds[5], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'June 06, 2020' }

      ]);
    })
    .then(function(){
      return knex('property_notes').insert([
        {prop_id:propIds[0], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[1], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[2], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[3], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[4], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[5], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']}
      ])
    });
};
