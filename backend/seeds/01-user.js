
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'paige@gmail.com', password: '$2a$10$egABjQWVHEBEcuEyzK.mVuKsIlUmnhihMl.oHUK.GBFKxO4ZNWc7m', name: 'Paige', city: 'Austin'},
        {email: 'mel@gmail.com', password: '$2a$10$egABjQWVHEBEcuEyzK.mVuKsIlUmnhihMl.oHUK.GBFKxO4ZNWc7m', name: 'Mel', city: 'Austin'},
        {email: 'amanda@gmail.com', password: '$2a$10$egABjQWVHEBEcuEyzK.mVuKsIlUmnhihMl.oHUK.GBFKxO4ZNWc7m', name: 'Amanda', city: 'Dallas'}
      ]);
    });
};
