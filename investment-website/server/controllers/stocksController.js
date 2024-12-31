const db = require('../config/connection.js'); // Import database connection

const getMostRecentStock = async () => {
    try {
        const query = `
            SELECT id, Ticker, previousClose, MarketValuePerShare, NominalValuePerShare, profitMargins, beta, dividendRate, exDividendDate, TargetPriceUpside, IRR, targetMeanPrice, exDividendDate, freeCashflow
            FROM ArchiveStockForecast
            GROUP BY id, Ticker, previousClose, MarketValuePerShare, NominalValuePerShare, profitMargins, beta, dividendRate, exDividendDate, TargetPriceUpside, IRR, targetMeanPrice, exDividendDate, freeCashflow
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleMostRecentStock = async (req, res) => {
    try {
        const query = `
            SELECT id, Ticker, previousClose, MarketValuePerShare, NominalValuePerShare, profitMargins, beta, dividendRate, exDividendDate, TargetPriceUpside, IRR, targetMeanPrice, exDividendDate, freeCashflow
            FROM ArchiveStockForecast
            WHERE id = '${req.params.id}'
            GROUP BY id, Ticker, previousClose, MarketValuePerShare, NominalValuePerShare, profitMargins, beta, dividendRate, exDividendDate, TargetPriceUpside, IRR, targetMeanPrice, exDividendDate, freeCashflow
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getMostRecentStock, getSingleMostRecentStock
};