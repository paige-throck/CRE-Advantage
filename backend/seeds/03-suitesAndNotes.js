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
        {prop_id:propIds[5], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'June 06, 2020' },

        {prop_id:propIds[6], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[6], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[7], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[7], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[8], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[8], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[9], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[9], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[10], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[10], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[11], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[11], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[12], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[12], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[13], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[13], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[14], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[14], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[15], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[15], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[16], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[16], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[17], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[17], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[18], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[18], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[19], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[19], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[20], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[20], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[21], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[21], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[22], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[22], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[23], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[23], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[24], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[24], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[25], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[25], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[26], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[26], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[27], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[27], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[28], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[28], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[29], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[29], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[30], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[30], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[31], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[31], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[32], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[32], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[33], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[33], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[34], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[34], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[35], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[35], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[36], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[36], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[37], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[37], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[38], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[38], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[39], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[39], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[40], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[40], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[41], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[41], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[42], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[42], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[43], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[43], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[44], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[44], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[45], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[45], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[46], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[46], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[47], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[47], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[48], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[48], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[49], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[49], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[50], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[50], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[51], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[51], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[52], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[52], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[53], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[53], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[54], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[54], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[55], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[55], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[56], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[56], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

        {prop_id:propIds[57], suite_num:'A10', tenant:'Doug', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },
        {prop_id:propIds[57], suite_num:'B4', tenant:'Marc', suite_size:100, rental_rate:10, lease_date:'May 10, 2020' },

      ]);
    })
    .then(function(){
      return knex('property_notes').insert([
        {prop_id:propIds[0], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[1], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[2], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[3], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[4], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[5], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[6], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[7], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[8], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[9], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[10], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[11], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[12], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[13], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[14], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[15], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[16], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[17], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[18], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[19], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[20], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[21], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[22], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[23], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[24], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[25], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[26], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[27], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[28], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[29], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[30], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[31], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[32], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[33], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[34], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[35], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[36], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[37], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[38], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[39], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[40], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[41], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[42], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[43], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[44], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[45], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[46], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[47], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[48], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[49], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[50], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[51], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[52], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[53], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
        {prop_id:propIds[54], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[55], notes:['Owner is selling', 'Suite damage on floor 3', 'Construction is happening across street']},
        {prop_id:propIds[56], notes:['Owner is selling', 'Suite damage on floor 3']},
        {prop_id:propIds[57], notes:['Owner is selling', 'Suite damage on floor 3', 'Suite updates being made']},
      ])
    });
};
