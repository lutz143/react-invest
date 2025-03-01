const db = require('../config/connection.js'); // Import database connection

const getSingleMonthlyStockPriceData = async (req, res) => {
    try {
        const query = `
            SELECT id, Ticker, price_date, adjclose, percent_return
            FROM priceDataMonthly
            WHERE id = '${req.params.id}'
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getAllIncomeData = async () => { // Retrieve all the metadata for the stock
    try {
        const query = `
            SELECT id, Ticker, asOfYear, periodType, TotalRevenue, CostOfRevenue, GrossProfit, TotalExpenses, EBIT, BasicEPS, NetIncome
            FROM incomeStatement
            WHERE periodType <> 'TTM'
            GROUP BY id, Ticker, asOfYear, periodType, TotalRevenue, CostOfRevenue, GrossProfit, TotalExpenses, EBIT, BasicEPS, NetIncome
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleIncomeStatment = async (req, res) => {
    try {
        const query = `
            SELECT id, Ticker, asOfYear, periodType, TotalRevenue, CostOfRevenue, GrossProfit, TotalExpenses, EBIT, BasicEPS, NetIncome
            FROM incomeStatement
            WHERE periodType <> 'TTM' AND id = '${req.params.id}'
            GROUP BY id, Ticker, asOfYear, periodType, TotalRevenue, CostOfRevenue, GrossProfit, TotalExpenses, EBIT, BasicEPS, NetIncome
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getMostRecentIncomeStatement = async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM incomeStatement
            WHERE periodType <> 'TTM' AND id = '${req.params.id}'
            ORDER BY asOfDate DESC LIMIT 1;
        ;`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};



const getAllBalanceSheetData = async () => { // Retrieve all the metadata for the stock
    try {
        const query = `
            SELECT id, Ticker, asOfYear, periodType, CurrentAssets, CashAndCashEquivalents, AccountsReceivable, Inventory, GrossPPE, TotalAssets, CurrentLiabilities, Payables, CurrentDebtAndCapitalLeaseObligation as CurrentDebt, LongTermDebt, TotalLiabilitiesNetMinorityInterest as TotalLiabilities, RetainedEarnings, CommonStock, AdditionalPaidInCapital, TotalEquityGrossMinorityInterest as TotalEquity
            FROM balanceSheet
            WHERE periodType <> 'TTM'
            GROUP BY id, Ticker, asOfYear, periodType, CurrentAssets, CashAndCashEquivalents, AccountsReceivable, Inventory, GrossPPE, TotalAssets, CurrentLiabilities, Payables, CurrentDebtAndCapitalLeaseObligation, LongTermDebt, TotalLiabilitiesNetMinorityInterest, RetainedEarnings, CommonStock, AdditionalPaidInCapital, TotalEquityGrossMinorityInterest
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleBalanceSheet = async (req, res) => {
    try {
        const query = `
            SELECT id, Ticker, asOfYear, periodType, CurrentAssets, CashAndCashEquivalents, AccountsReceivable, Inventory, GrossPPE, TotalAssets, CurrentLiabilities, WorkingCapital, Payables, CurrentDebtAndCapitalLeaseObligation as CurrentDebt, LongTermDebt, TotalLiabilitiesNetMinorityInterest as TotalLiabilities, RetainedEarnings, CommonStock, AdditionalPaidInCapital, TotalEquityGrossMinorityInterest as TotalEquity
            FROM balanceSheet
            WHERE periodType <> 'TTM' AND id = '${req.params.id}'
            GROUP BY id, Ticker, asOfYear, periodType, CurrentAssets, CashAndCashEquivalents, AccountsReceivable, Inventory, GrossPPE, TotalAssets, CurrentLiabilities, WorkingCapital, Payables, CurrentDebtAndCapitalLeaseObligation, LongTermDebt, TotalLiabilitiesNetMinorityInterest, RetainedEarnings, CommonStock, AdditionalPaidInCapital, TotalEquityGrossMinorityInterest
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getMostRecentBalanceSheet = async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM balanceSheet
            WHERE periodType <> 'TTM' AND id = '${req.params.id}'
            ORDER BY asOfDate DESC LIMIT 1;
        ;`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};



const getAllCashFlowData = async () => { // Retrieve all the metadata for the stock
    try {
        const query = `
            SELECT id, Ticker, asOfYear, periodType, OperatingGainsLosses, DepreciationAndAmortization, ChangeInWorkingCapital, CashFlowFromContinuingOperatingActivities, CapitalExpenditure, CashFlowFromContinuingInvestingActivities, CashFlowFromContinuingInvestingActivities, NetIssuancePaymentsOfDebt, NetCommonStockIssuance, CashFlowFromContinuingFinancingActivities, ChangesInCash, EndCashPosition
            FROM cashFlow
            WHERE periodType <> 'TTM'
            GROUP BY id, Ticker, asOfYear, periodType, OperatingGainsLosses, DepreciationAndAmortization, ChangeInWorkingCapital, CashFlowFromContinuingOperatingActivities, CapitalExpenditure, CashFlowFromContinuingInvestingActivities, CashFlowFromContinuingInvestingActivities, NetIssuancePaymentsOfDebt, NetCommonStockIssuance, CashFlowFromContinuingFinancingActivities, ChangesInCash, EndCashPosition
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getSingleCashFlow = async (req, res) => {
    try {
        const query = `
            SELECT id, Ticker, asOfYear, periodType, OperatingGainsLosses, DepreciationAndAmortization, ChangeInWorkingCapital, CashFlowFromContinuingOperatingActivities, CapitalExpenditure, CashFlowFromContinuingInvestingActivities, CashFlowFromContinuingInvestingActivities, NetIssuancePaymentsOfDebt, NetCommonStockIssuance, CashFlowFromContinuingFinancingActivities, ChangesInCash, EndCashPosition
            FROM cashFlow
            WHERE periodType <> 'TTM' AND id = '${req.params.id}'
            GROUP BY id, Ticker, asOfYear, periodType, OperatingGainsLosses, DepreciationAndAmortization, ChangeInWorkingCapital, CashFlowFromContinuingOperatingActivities, CapitalExpenditure, CashFlowFromContinuingInvestingActivities, CashFlowFromContinuingInvestingActivities, NetIssuancePaymentsOfDebt, NetCommonStockIssuance, CashFlowFromContinuingFinancingActivities, ChangesInCash, EndCashPosition
        ;`;

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

const getMostRecentCashFlow = async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM cashFlow
            WHERE periodType <> 'TTM' AND id = '${req.params.id}'
            ORDER BY asOfDate DESC LIMIT 1;
        ;`;

        const [[rows]] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSingleMonthlyStockPriceData,
    getAllIncomeData, getSingleIncomeStatment, getMostRecentIncomeStatement,
    getAllBalanceSheetData, getSingleBalanceSheet, getMostRecentBalanceSheet,
    getAllCashFlowData, getSingleCashFlow, getMostRecentCashFlow
};