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
                ArchiveStockForecast.NominalValuePerShare,
                ArchiveStockForecast.Valuation_Date,
                user_positions.id,
                user_positions.purchase_date,
                user_positions.quantity,
                user_positions.avg_price,
                user_positions.cost_basis,
                user_positions.current_price_at_invest,
                user_positions.nom_price_at_invest,
                user_positions.target_price_at_invest
            FROM 
                user
            LEFT JOIN 
                portfolio
            ON 
                portfolio.user_id = user.id
            LEFT JOIN
                user_positions
            ON
                user_positions.user_id = portfolio.user_id 
                AND user_positions.valuation_id = portfolio.valuation_id
            LEFT JOIN
                ArchiveStockForecast
            ON
                ArchiveStockForecast.ticker_id = portfolio.valuation_id
            WHERE user.id = '${req.params.id}' AND user_positions.open_close <> 'CLOSED'
            GROUP BY 
                user.id, user.username, user.email, portfolio.valuation_id, 
                ArchiveStockForecast.Ticker,
                ArchiveStockForecast.exDividendDate,
                ArchiveStockForecast.previousClose,
                ArchiveStockForecast.MarketValuePerShare,
                ArchiveStockForecast.targetMeanPrice,
                ArchiveStockForecast.NominalValuePerShare,
                ArchiveStockForecast.Valuation_Date,
                user_positions.id,
                user_positions.purchase_date,
                user_positions.quantity,
                user_positions.avg_price,
                user_positions.cost_basis,
                user_positions.current_price_at_invest,
                user_positions.nom_price_at_invest,
                user_positions.target_price_at_invest;
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    getUserPortfolio,
};