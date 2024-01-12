const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');
const { IncomeStatement } = require('../../models');

// GET all incomeStatement data
router.get('/', async (req, res) => {
  try {
    const incomeStatementData = await IncomeStatement.findAll();
    res.status(200).json(incomeStatementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/xlsx/:id', async (req, res) => {
  try {
    const singleIncomeStatementData = await IncomeStatement.findAll({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(singleIncomeStatementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single cashFlow data with the most recent date (more than likely TTM)
router.get('/:id', async (req, res) => {
  try {
    const singleIncomeStatementData = await stocksController.getSingleIncomeStatementData(req, res);
    if (!singleIncomeStatementData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }
    res.status(200).json(singleIncomeStatementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;