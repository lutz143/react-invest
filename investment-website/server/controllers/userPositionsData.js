const db = require('../config/connection.js'); // Import database connection

const updateUserPositionById = async (id, quantity, avg_price) => {
    try {
        const query = `
            UPDATE user_positions
            SET quantity = ${quantity}, avg_price = ${avg_price}
            WHERE id = ${id};
        `;

        const [result] = await db.query(query);

        console.log("Update Result:", result);
        return result;
    } catch (error) {
        console.error("Error updating user position:", error);
        throw error;
    }
};

module.exports = { updateUserPositionById };
