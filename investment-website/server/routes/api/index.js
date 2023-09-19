const router = require('express').Router();
const valuationRoutes = require('./valuationRoutes');
const recentRoutes = require('./recentRoutes');
// const locationRoutes = require('./locationRoutes');
// const tripRoutes = require('./tripRoutes');

router.use('/valuations', valuationRoutes);
router.use('/recent', recentRoutes);
// router.use('/locations', locationRoutes);
// router.use('/trips', tripRoutes);

module.exports = router;
