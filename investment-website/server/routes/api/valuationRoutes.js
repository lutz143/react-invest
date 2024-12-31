const router = require('express').Router();
// const { Valuation, Portfolio, User, Comment } = require('../../models');
const stocksController = require('../../controllers/stocksController.js');

// GET all Stock Valuations
router.get('/', async (req, res) => {
    try {
        const mostRecentStock = await stocksController.getMostRecentStock();
        res.json(mostRecentStock);
    } catch (error) {
        console.error('Error fetching most recent stock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a single stock cash flow data
router.get('/:id', async (req, res) => {
    try {
        const singleStockData = await stocksController.getSingleMostRecentStock(req, res);
        if (!singleStockData) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(singleStockData);
    } catch (err) {
        res.status(500).json(err);
    }
});



// GET all Stock Valuations
// router.get('/', async (req, res) => {
//   try {
//     const valuationData = await Valuation.findAll({
//       include: [{ model: Comment,
//           attributes: ['id', 'Ticker', 'comment', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//       }],
//     });
//     res.status(200).json(valuationData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET a single valuation
// router.get('/:id', async (req, res) => {
//   try {
//     const valuationData = await Valuation.findByPk(req.params.id, {
//       // JOIN with locations, using the Trip through table
//       include: [{ model: Comment,
//           attributes: ['id', 'Ticker', 'comment', 'created_at'],
//       }],
//     });

//     if (!valuationData) {
//       res.status(404).json({ message: 'No stock found with this id!' });
//       return;
//     }
//     res.status(200).json(valuationData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // add a stock to the portfolio and save associated logged in user
// router.post('/:id/add-stock', async (req, res) => {
//   try {
//     const stockData = await Portfolio.create(req.body);
//     if (!stockData) {
//       res.status(404).json({ message: 'No stock found with this id!' });
//       return;
//     }
//     res.status(200).json({ stockData, message: 'Stock added!' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;