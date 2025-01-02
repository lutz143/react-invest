const db = require('../config/connection.js'); // Import database connection

const getStockComments = async (req, res) => {
    try {
        const query = `
            SELECT 
                comment.id,
                comment.user_id,
                user.username,
                comment.ticker,
                comment.valuation_id,
                comment.comment,
                comment.created_at,
                comment.updated_at
            FROM 
                comment
            INNER JOIN 
                user
            ON 
                comment.user_id = user.id
            WHERE comment.valuation_id = '${req.params.id}';
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getStockComments
};