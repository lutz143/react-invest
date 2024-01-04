const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class IncomeStatement extends Model {}

IncomeStatement.init(
  {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true
    },
    Pull_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Ticker: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    BasicAverageShares: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    BasicEPS: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    DilutedEPS: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CostOfRevenue: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    EBIT: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    EBITDA: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    GeneralAndAdministrativeExpense: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    GrossProfit: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    InterestExpense: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetIncome: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetIncomeContinuousOperations: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    OperatingExpense: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    OperatingIncome: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    OperatingRevenue: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    SellingGeneralAndAdministration: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TaxRateForCalcs: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalExpenses: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalOperatingIncomeAsReported: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalRevenue: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ResearchAndDevelopment: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    SellingAndMarketingExpense: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    SalariesAndWages: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    WriteOff: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    Amortization: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'incomestatement'
  }
);

module.exports = IncomeStatement;