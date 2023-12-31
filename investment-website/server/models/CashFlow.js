const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class CashFlow extends Model {}

CashFlow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Ticker: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    BeginningCashPosition: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CapitalExpenditure: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'cashflow'
  }
);

module.exports = CashFlow;