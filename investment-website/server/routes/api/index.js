const router = require('express').Router();
const userRoutes = require('./userRoutes');
const valuationRoutes = require('./valuationRoutes');
const recentRoutes = require('./recentRoutes');
const portfolioRoutes = require('./portfolioRoutes');
// const locationRoutes = require('./locationRoutes');

router.use('/users', userRoutes);
router.use('/valuations', valuationRoutes);
router.use('/recent', recentRoutes);
router.use('/portfolio', portfolioRoutes);
// router.use('/trips', tripRoutes);

module.exports = router;
