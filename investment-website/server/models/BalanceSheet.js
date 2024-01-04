const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class BalanceSheet extends Model {}

BalanceSheet.init(
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

    AccountsPayable: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    AccountsReceivable: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    AccumulatedDepreciation: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    AdditionalPaidInCapital: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CashAndCashEquivalents: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CommonStockEquity: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CurrentAssets: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CurrentLiabilities: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    GrossPPE: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    InvestedCapital: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    LongTermDebt: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetDebt: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetPPE: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    Payables: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    PayablesAndAccruedExpenses: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    Receivables: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    RetainedEarnings: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ShareIssued: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    StockholdersEquity: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TangibleBookValue: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalAssets: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalCapitalization: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalDebt: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    TotalNonCurrentAssets: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    WorkingCapital: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    Inventory: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    RawMaterials: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    WorkInProcess: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    // underscored: true,
    modelName: 'balancesheet'
  }
);

module.exports = BalanceSheet;