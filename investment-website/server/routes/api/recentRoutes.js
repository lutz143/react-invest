const router = require('express').Router();
const stocksController = require('../../controllers/stocksController.js');

// GET most recent stock Valuation
router.get('/', async (req, res) => {
  try {
    const mostRecentStock = await stocksController.getMostRecentStock();
    res.json(mostRecentStock);
  } catch (error) {
    console.error('Error fetching most recent stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single valuation
// router.get('/:id', async (req, res) => {
//   try {
//     const valuationData = await Valuation.findByPk(req.params.id, {
//       // JOIN with locations, using the Trip through table
//       // include: [{ model: Valuation, through: Trip, as: 'planned_trips' }]
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

module.exports = router;