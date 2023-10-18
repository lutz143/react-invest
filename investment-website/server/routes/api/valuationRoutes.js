const router = require('express').Router();
const { Valuation, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all Stock Valuations
router.get('/', async (req, res) => {
  try {
    const valuationData = await Valuation.findAll();
    res.status(200).json(valuationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single valuation
router.get('/:id', async (req, res) => {
  try {
    const valuationData = await Valuation.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      // include: [{ model: Valuation, through: Trip, as: 'planned_trips' }]
    });

    if (!valuationData) {
      res.status(404).json({ message: 'No stock found with this id!' });
      return;
    }
    res.status(200).json(valuationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit user to include the stock to their list
router.put('/:id/add-stock', withAuth, async (req, res) => {
  try {
    const stockData = await User.update({
      valuation_id: req.params.id,
      // include: [{ model: Valuation, 
      //   attributes: ['id', 'Ticker', 'Assessment_Date'],
      // }]
      // post_content: req.body.post_content
    },
    {
      where: {
        id: req.session.user_id,
      }
    }
    );
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
