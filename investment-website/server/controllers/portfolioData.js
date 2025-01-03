const db = require('../config/connection.js'); // Import database connection

const getUserPortfolio = async (req, res) => {
    try {
        const query = `
            SELECT 
                user.id,
                user.username,
                user.email,
                portfolio.valuation_id,
                ArchiveStockForecast.Ticker,
                ArchiveStockForecast.exDividendDate,
                ArchiveStockForecast.previousClose,
                ArchiveStockForecast.MarketValuePerShare,
                ArchiveStockForecast.targetMeanPrice,
                ArchiveStockForecast.NominalValuePerShare
            FROM 
                user
            LEFT JOIN 
                portfolio
            ON 
                portfolio.user_id = user.id
            LEFT JOIN
                ArchiveStockForecast
            ON
                ArchiveStockForecast.id = portfolio.valuation_id
            WHERE user.id = '${req.params.id}'
            GROUP BY user.id, user.username, user.email, portfolio.valuation_id, 
                ArchiveStockForecast.Ticker,
                ArchiveStockForecast.exDividendDate,
                ArchiveStockForecast.previousClose,
                ArchiveStockForecast.MarketValuePerShare,
                ArchiveStockForecast.targetMeanPrice,
                ArchiveStockForecast.NominalValuePerShare;
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserPortfolio
};