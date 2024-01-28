const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');


// GET a single stock data with Valuation and MetaData attributes
router.get('/:id', async (req, res) => {
  try {
    const singlePriceData = await stocksController.getSinglePriceData(req, res);
    if (!singlePriceData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }
    res.status(200).json(singlePriceData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;