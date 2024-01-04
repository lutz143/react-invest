const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');
const { BalanceSheet } = require('../../models');

// GET all balanceSheet data
router.get('/', async (req, res) => {
  try {
    const balanceSheetData = await BalanceSheet.findAll();
    res.status(200).json(balanceSheetData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET a single cashFlow data with the most recent date (more than likely TTM)
router.get('/:id', async (req, res) => {
  try {
    const singleBalanceSheetData = await stocksController.getSingleBalanceSheetData(req, res);
    if (!singleBalanceSheetData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }
    res.status(200).json(singleBalanceSheetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;