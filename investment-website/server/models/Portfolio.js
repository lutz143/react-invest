const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Portfolio model
class Portfolio extends Model {}

Portfolio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    valuation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'valuation',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'portfolio'
  }
);

module.exports = Portfolio;