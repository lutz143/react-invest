const router = require('express').Router();
const userRoutes = require('./userRoutes');
const valuationRoutes = require('./valuationRoutes');
const priceDataRoutes = require('./priceDataRoutes');
const metaDataRoutes = require('./metaDataRoutes');
const recentRoutes = require('./recentRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const commentRoutes = require('./commentRoutes');
const cashFlowRoutes = require('./cashFlowRoutes');
const balanceSheetRoutes = require('./balanceSheetRoutes');
const incomeStatementRoutes = require('./incomeStatementRoutes');

router.use('/users', userRoutes);
router.use('/valuations', valuationRoutes);
router.use('/priceData', priceDataRoutes);
router.use('/recent', recentRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/metaData', metaDataRoutes);
router.use('/comments', commentRoutes);
router.use('/cashflow', cashFlowRoutes);
router.use('/balanceSheet', balanceSheetRoutes);
router.use('/incomeStatement', incomeStatementRoutes);

module.exports = router;
