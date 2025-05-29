const db = require('../config/connection.js'); // Import database connection

const getAllMetaData = async () => { // Retrieve all the metadata for the stock
    try {
        const query = `SELECT * FROM MetaData ORDER BY Ticker;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleMetaData = async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM MetaData
            INNER JOIN ArchiveStockForecast
            ON MetaData.ticker_id = ArchiveStockForecast.ticker_id
            WHERE MetaData.ticker_id = '${req.params.id}';`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllMetaData, getSingleMetaData
};