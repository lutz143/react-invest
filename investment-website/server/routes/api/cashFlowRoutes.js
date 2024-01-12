const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');
const { CashFlow } = require('../../models');

// GET all cashFlow data
router.get('/', async (req, res) => {
  try {
    const cashFlowData = await CashFlow.findAll();
    res.status(200).json(cashFlowData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/xlsx/:id', async (req, res) => {
  try {
    const singleCashFlowData = await CashFlow.findAll({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(singleCashFlowData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single cashFlow data with the most recent date (more than likely TTM)
router.get('/:id', async (req, res) => {
  try {
    const singleCashFlowData = await stocksController.getSingleCashFlowData(req, res);
    if (!singleCashFlowData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }
    res.status(200).json(singleCashFlowData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;