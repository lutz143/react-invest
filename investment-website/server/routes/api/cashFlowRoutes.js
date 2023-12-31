const router = require('express').Router();
// const { CashFlow, Valuation } = require('../../models');
const { CashFlow } = require('../../models');

// GET all Stock Valuations
router.get('/', async (req, res) => {
  try {
    const cashFlowData = await CashFlow.findAll();
    res.status(200).json(cashFlowData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single valuation
router.get('/:id', async (req, res) => {
  try {
    const cashFlowData = await CashFlow.findByPk(req.params.id);

    if (!cashFlowData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }
    res.status(200).json(cashFlowData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;