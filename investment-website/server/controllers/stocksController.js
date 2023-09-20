const db = require('../config/connection.js'); // Import database connection
console.log('i\'m here')

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

module.exports = {
  getMostRecentStock,
};
