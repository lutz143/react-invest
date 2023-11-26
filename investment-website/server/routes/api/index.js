const router = require('express').Router();
const userRoutes = require('./userRoutes');
const valuationRoutes = require('./valuationRoutes');
const metaDataRoutes = require('./metaDataRoutes');
const recentRoutes = require('./recentRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/valuations', valuationRoutes);
router.use('/recent', recentRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/metaData', metaDataRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
