const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class Valuation extends Model {}

Valuation.init(
  {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    Ticker: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    Assessment_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    previousClose: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    marketCap: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    sharesOutstanding: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Terminal_Rate: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    WACC: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    TerminalValue_CAGR: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    NPV_Total_CAGR: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    TerminalValue_NOM: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    NPV_Total_NOM: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    TerminalValue_CON: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    NPV_Total_CON: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    CAGR_CPS: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    NOM_CPS: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    CON_CPS: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    Swing_NOM: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    Swing_CAGR: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    CONF_NOM: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    CONF_CAGR: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'valuation'
  }
);

module.exports = Valuation;