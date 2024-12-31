const db = require('../config/connection.js'); // Import database connection

const getMostRecentStock = async () => {
    try {
        const query = `SELECT * FROM valuation ORDER BY Assessment_Date DESC LIMIT 3;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};


const getSinglePriceData = async (req, res) => {
    try {
        const query = `SELECT * FROM priceData WHERE id = '${req.params.id}' ORDER BY price_date DESC;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleCashFlowData = async (req, res) => {
    try {
        const query = `SELECT * FROM cashFlow WHERE id = '${req.params.id}' ORDER BY asOfDate DESC LIMIT 1;`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleBalanceSheetData = async (req, res) => {
    try {
        const query = `SELECT * FROM balanceSheet WHERE id = '${req.params.id}' ORDER BY asOfDate DESC LIMIT 1;`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleIncomeStatementData = async (req, res) => {
    try {
        const query = `SELECT * FROM incomeStatement WHERE id = '${req.params.id}' ORDER BY asOfDate DESC LIMIT 1;`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getMostRecentStock, getSingleCashFlowData, getSingleBalanceSheetData, getSingleIncomeStatementData, getSinglePriceData
};