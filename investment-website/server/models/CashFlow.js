const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class CashFlow extends Model {}

CashFlow.init(
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
    Pull_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    asOfDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    periodType: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    BeginningCashPosition: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    EndCashPosition: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CapitalExpenditure: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CashDividendsPaid: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CashFlowFromContinuingFinancingActivities: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CashFlowFromContinuingInvestingActivities: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    CashFlowFromContinuingOperatingActivities: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ChangeInAccountPayable: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ChangeInOtherWorkingCapital: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ChangeInReceivables: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ChangeInWorkingCapital: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ChangesInCash: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    DepreciationAndAmortization: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    FinancingCashFlow: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    FreeCashFlow: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    InvestingCashFlow: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    LongTermDebtPayments: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetIncome: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetIncomeFromContinuingOperations: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    NetLongTermDebtIssuance: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    OperatingCashFlow: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    OperatingGainsLosses: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    ChangesInAccountReceivables: {
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