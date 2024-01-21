const User = require('./User');
const Valuation = require('./Valuation');
const Portfolio = require('./Portfolio')
const MetaData = require('./MetaData')
const Comment = require('./Comment');
const CashFlow = require('./CashFlow');
const BalanceSheet = require('./BalanceSheet');
const IncomeStatement = require('./IncomeStatement')

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

Valuation.hasMany(MetaData, {
  foreignKey: 'valuation_id',
  onDelete: 'CASCADE'
})

MetaData.belongsTo(Valuation, {
  foreignKey: 'valuation_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Valuation.hasMany(Comment, {
  foreignKey: 'valuation_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Valuation, {
  foreignKey: 'valuation_id'
});

module.exports = { User, Valuation, Portfolio, MetaData, Comment, CashFlow, BalanceSheet, IncomeStatement };