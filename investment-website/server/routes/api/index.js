const router = require('express').Router();
const valuationRoutes = require('./valuationRoutes');
// const locationRoutes = require('./locationRoutes');
// const tripRoutes = require('./tripRoutes');

router.use('/valuations', valuationRoutes);
// router.use('/locations', locationRoutes);
// router.use('/trips', tripRoutes);

module.exports = router;
