const router = require('express').Router();
const stocksController = require('../../controllers/financialData.js');

// GET all balanceSheet data
router.get('/', async (req, res) => {
    try {
        const stockData = await stocksController.getAllBalanceSheetData();
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching most recent stock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a single stock balance sheet data
router.get('/xlsx/:id', async (req, res) => {
    try {
        const singleStockData = await stocksController.getSingleBalanceSheet(req, res);
        if (!singleStockData) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(singleStockData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single most recent stock balance sheet data
router.get('/:id', async (req, res) => {
    try {
        const singleStockData = await stocksController.getMostRecentBalanceSheet(req, res);
        if (!singleStockData) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(singleStockData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;