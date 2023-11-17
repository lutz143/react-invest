const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class MetaData extends Model {}

MetaData.init(
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
    fullTimeEmployees: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sector: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    beta: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    debtToEquity: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    dividendRate: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    dividendYield: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    exDividendDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mostRecentQuarter: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    valuation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'valuation',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'metadata'
  }
);

module.exports = MetaData;