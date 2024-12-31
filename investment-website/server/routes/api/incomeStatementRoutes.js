const router = require('express').Router();
const stocksController = require('../../controllers/financialData.js');

// GET all income statement attributes
router.get('/', async (req, res) => {
    try {
        const stockData = await stocksController.getAllIncomeData();
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching most recent stock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a single stock income statement data
router.get('/:id', async (req, res) => {
    try {
        const singleStockData = await stocksController.getSingleIncomeStatment(req, res);
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
//     const singleIncomeStatementData = await IncomeStatement.findAll({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json(singleIncomeStatementData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET a single incomeStatement data
router.get('/:id', async (req, res) => {
    try {
        const singleIncomeStatementData = await stocksController.getSingleIncomeStatment(req, res);
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