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
router.get('/:id', async (req, res) => {
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

// router.get('/xlsx/:id', async (req, res) => {
//   try {
//     const balanceSheetData = await BalanceSheet.findAll({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json(balanceSheetData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;