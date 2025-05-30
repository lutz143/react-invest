const db = require('../config/connection.js'); // Import database connection

const getStockCycleTime = async (req, res) => {
    try {
        const query = `
            WITH BaseData AS (
                SELECT 
                    t1.Ticker,
                    YEAR(t1.asOfDate) AS year,
                    t3.ticker_id,
                    t3.sector,
                    t3.industry,
                    t1.AccountsReceivable / t2.TotalRevenue * 365 AS AR_Days,
                    t1.Inventory / t2.CostOfRevenue * 365 AS Inventory_Days,
                    t1.Payables / t2.CostOfRevenue * 365 AS AP_Days
                FROM BalanceSheet t1
                INNER JOIN IncomeStatement t2
                    ON t1.Ticker = t2.Ticker AND YEAR(t1.asOfDate) = YEAR(t2.asOfDate)
                INNER JOIN MetaData t3
                    ON t1.Ticker = t3.Ticker
                WHERE t1.periodType <> 'TTM' AND t2.periodType <> 'TTM'
            ),
            SectorAverages AS (
                SELECT 
                    sector,
                    AVG(AR_Days) AS Avg_Sector_AR_Days,
                    AVG(AP_Days) AS Avg_Sector_AP_Days,
                    AVG(Inventory_Days) AS Avg_Sector_Inventory_Days
                FROM BaseData
                GROUP BY sector
            )
            SELECT 
                b.Ticker,
                b.year,
                b.sector,
                b.industry,
                b.AR_Days,
                s.Avg_Sector_AR_Days,
                b.AP_Days,
                s.Avg_Sector_AP_Days,
                b.Inventory_Days,
                s.Avg_Sector_Inventory_Days
            FROM BaseData b
            JOIN SectorAverages s ON b.sector = s.sector
            WHERE b.ticker_id = '${req.params.id}'
            ORDER BY b.year;
        `;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getStockCycleTime,
};
