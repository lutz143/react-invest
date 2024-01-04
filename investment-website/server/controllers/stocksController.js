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

const getMetaData = async () => {
  try {
    const query = `SELECT * FROM MetaData JOIN valuation ON MetaData.id = valuation.id;`;

    const [rows] = await db.query(query);
    console.log(rows)
    return rows;
  } catch (error) {
    throw error;
  }
};

const getSingleMetaData = async (req, res) => {
  try {
    const query = `SELECT * FROM MetaData JOIN valuation ON MetaData.id = valuation.id WHERE MetaData.id = '${req.params.id}';`;

    const [[rows]] = await db.query(query);
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

module.exports = {
  getMostRecentStock, getMetaData, getSingleMetaData, getSingleCashFlowData, getSingleBalanceSheetData
};