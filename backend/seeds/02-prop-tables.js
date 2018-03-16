let ids = [];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('properties').del()
    .then(function(){
      return knex.select('id').from('users')
    })
    .then(function(userId){
      userId.forEach(function(element){
        let index = 0;
        let key = Object.keys(element)[index];
        val = element[key];
        ids.push(val);
      })
      return knex('properties').insert([
        {
        user_id:ids[0],
        address: '119 Nueces St, Austin, TX 78701',
        prop_owner: 'Bob',
        num_suites: 10,
        prop_size:16000,
        lat: 30.265557030,
        lang: -97.749699097,
        prospective_prop: false,
        prop_type:'Office',
        prop_range:5
        },
        {
          user_id:ids[0],
          address: '901 Little Texas Lane, Austin, TX 78745',
          prop_owner: 'George',
          num_suites: 10,
          prop_size:13000,
          lat: 30.1976950,
          lang: -97.768543097,
          prospective_prop: false,
          prop_type:'Retail',
          prop_range:10
        },
        {
          user_id:ids[1],
          address: '12707 Nutty Brown Rd, Austin, TX 78737',
          prop_owner: 'Gloria',
          num_suites: 10,
          prop_size:13000,
          lat: 30.1983676,
          lang: -97.9741824,
          prospective_prop: false,
          prop_type:'Industrial',
          prop_range:8
        },
        {
          user_id:ids[1],
          address: '11501 Rock Rose Ave, Austin, TX, 78758',
          prop_owner: 'George',
          num_suites: 5,
          prop_size:20000,
          lat: 30.4020649,
          lang: -97.7258829,
          prospective_prop: false,
          prop_type:'Retail',
          prop_range:4.5

        },
        {
          user_id:ids[2],
          address: '5301 Alpha Rd, Dallas, TX, 75240',
          prop_owner: 'Lisa',
          num_suites: 5,
          prop_size:18720,
          lat: 32.9336762,
          lang: -96.8194445,
          prospective_prop: false,
          prop_type:'Retail',
          prop_range:10.5
        },
        {
          user_id:ids[2],
          address: '3699 McKinney Ave, Dallas, TX 75204',
          prop_owner: 'Bill',
          num_suites: 8,
          prop_size:10000,
          lat: 32.8083303,
          lang: -96.7995475,
          prospective_prop: false,
          prop_type:'Retail',
          prop_range:3
        }

      ]);
    });
};
