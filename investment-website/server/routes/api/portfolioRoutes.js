const router = require('express').Router();
const { Portfolio } = require('../../models');


// GET all Stock Valuations
router.get('/', async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll();
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a stock from the user
router.delete('/:id', async (req, res) => {
  try {
    const portfolioData = await Portfolio.destroy({
      where: { 
        user_id: req.body.id,
        valuation_id: req.params.id
      }
    });
    if (!portfolioData) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
