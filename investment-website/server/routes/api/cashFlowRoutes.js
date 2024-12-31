const router = require('express').Router();
const stocksController = require('../../controllers/financialData.js');

// GET all cashFlow data
router.get('/', async (req, res) => {
    try {
        const stockData = await stocksController.getAllCashFlowData();
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching most recent stock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a single stock cash flow data
router.get('/:id', async (req, res) => {
    try {
        const singleStockData = await stocksController.getSingleCashFlow(req, res);
        if (!singleStockData) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(singleStockData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/xlsx/:id', async (req, res) => {
//   try {
//     const singleCashFlowData = await CashFlow.findAll({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json(singleCashFlowData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;