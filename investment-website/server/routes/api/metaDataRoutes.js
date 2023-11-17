const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');

// GET all Valuation and MetaData attributes
router.get('/', async (req, res) => {
  try {
    const stockData = await stocksController.getMetaData();
    res.json(stockData);
  } catch (error) {
    console.error('Error fetching most recent stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single stock data with Valuation and MetaData attributes
router.get('/:id', async (req, res) => {
  try {
    const singleStockData = await stocksController.getSingleMetaData(req, res);
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