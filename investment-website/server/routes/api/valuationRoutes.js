const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');
const commentData = require('../../controllers/commentData.js');
const { Portfolio, Valuation, Comment } = require('../../models');

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

// GET Stock comments
router.get('/:id', async (req, res) => {
    try {
        const stockComments = await commentData.getStockComments(req, res);
        if (!stockComments) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json(stockComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single valuation
// router.get('/:id', async (req, res) => {
//     try {
//         const valuationData = await Valuation.findByPk(req.params.id, {
//             // JOIN with locations, using the Trip through table
//             include: [{
//                 model: Comment,
//                 attributes: ['id', 'Ticker', 'comment', 'created_at'],
//             }],
//         });

//         if (!valuationData) {
//             res.status(404).json({ message: 'No stock found with this id!' });
//             return;
//         }
//         res.status(200).json(valuationData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// add a stock to the portfolio and save associated logged in user
router.post('/:id/add-stock', async (req, res) => {
    try {
        const stockData = await Portfolio.create(req.body);
        if (!stockData) {
            res.status(404).json({ message: 'No stock found with this id!' });
            return;
        }
        res.status(200).json({ stockData, message: 'Stock added!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;