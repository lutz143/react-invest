const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import the Sequelize instance

// create our Valuation model
class Valuation extends Model { }

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
        MarketValuePerShare: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        NominalValuePerShare: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        targetMeanPrice: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        profitMargins: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        beta: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        dividendRate: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
        exDividendDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        TargetPriceUpside: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        IRR: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        freeCashflow: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: false,
        },
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