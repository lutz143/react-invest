const User = require('./User');
const Valuation = require('./Valuation');
const Portfolio = require('./Portfolio')

Valuation.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Portfolio,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'stock_users'
});

User.belongsToMany(Valuation, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Portfolio,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'portfolio_stocks'
});

module.exports = { User, Valuation, Portfolio };
