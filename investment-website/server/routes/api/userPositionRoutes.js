const router = require('express').Router();
const { updateUserPositionById } = require('../../controllers/userPositionsData.js');

router.put('/:id', async (req, res) => {
    const id = req.params.id;  // Get ID from URL
    const { quantity, avg_price } = req.body;  // Get updated values from request body

    console.log(`This is the ID captured: ${id}`);

    if (!id) {
        return res.status(400).json({ success: false, message: "Missing position id" });
    }

    try {
        // Correctly pass `id`, `quantity`, and `avg_price` to the controller
        const result = await updateUserPositionById(id, quantity, avg_price);
        res.status(200).json({ success: true, message: "Stock position updated successfully", result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating stock position", error });
    }
});

module.exports = router;
