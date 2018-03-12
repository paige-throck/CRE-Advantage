
exports.seed = function(knex, Promise) {
 // Deletes ALL existing entries
 return knex('properties').del()
   .then(function () {
     // Inserts seed entries
     return knex('properties').insert([
       {
         address: '119 Nueces St, Austin, TX 78701',
         prop_owner: 'Amanda',
         num_suites: 10,
         lat: 30.265557030,
         lang: -97.749699097,
         prospective_prop: false
       },
       {
         address: '901 Little Texas Lane, Austin, TX 78745',
         prop_owner: 'Melissa',
         num_suites: 10,
         lat: 30.1976950,
         lang: -97.768543097,
         prospective_prop: false
       }
     ]);
   });
};
