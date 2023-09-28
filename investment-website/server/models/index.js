const User = require('./User');
const Valuation = require('./Valuation');

User.hasMany(Valuation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Valuation.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Valuation };
