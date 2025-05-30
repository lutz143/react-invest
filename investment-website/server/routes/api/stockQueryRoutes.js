const router = require('express').Router();
const stockQuery = require('../../controllers/stockQueries.js');


// GET a single stock monthly price data from the priceDataMonthly table
router.get('/:id', async (req, res) => {
    try {
        const cycleTimeQuery = await stockQuery.getStockCycleTime(req, res);
        if (!cycleTimeQuery) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(cycleTimeQuery);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;