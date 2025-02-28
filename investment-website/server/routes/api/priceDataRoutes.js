const router = require('express').Router();
const stocksController = require('../../controllers/financialData.js');


// GET a single stock monthly price data from the priceDataMonthly table
router.get('/:id', async (req, res) => {
    try {
        const singleMonthlyPriceData = await stocksController.getSingleMonthlyStockPriceData(req, res);
        if (!singleMonthlyPriceData) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(singleMonthlyPriceData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;