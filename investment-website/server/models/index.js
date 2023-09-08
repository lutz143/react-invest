const Valuation = require('./Valuation');
// placeholder index.js for when I add in invested tabled and price tables into MySQL db

// const Location = require('./Location');
// const Trip = require('./Trip');

// Traveller.belongsToMany(Location, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Trip,
//     unique: false
//   },
//   // Define an alias for when data is retrieved
//   as: 'planned_trips'
// });

// Location.belongsToMany(Traveller, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: Trip,
//     unique: false
//   },
//   // Define an alias for when data is retrieved
//   as: 'location_travellers'
// });

module.exports = { Valuation };
