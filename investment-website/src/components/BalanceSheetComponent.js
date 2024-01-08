import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";

import classes from "../pages/Stock.module.css";
import formatModel from '../utils/formatUtils';

const BalanceSheetComponent = () => {
  const [jsonData, setJsonData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/balanceSheet/${id}`)
      .then((response) => {
        const balanceSheetData = response.data;

        // Iterate through balanceSheetData fields and apply formatting
        const formattedData = Object.keys(balanceSheetData).reduce((acc, key) => {
          if (typeof balanceSheetData[key] === 'number') {
            acc[key] = formatModel.formatInteger(balanceSheetData[key]);
          } else {
            acc[key] = balanceSheetData[key];
          }
          return acc;
        }, {});

        setJsonData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if(!jsonData) {
    return <p>Loading...</p>;
  }

  return (

      <section>
        <Container>
          <Card.Body>
            <Container className='mb-2'>          
              <Row className="align-items-center">
                <Col>
                  <span>
                    Total Assets: {jsonData.TotalAssets}
                  </span>
                </Col>
                <Col>
                  <span>
                    Total Debt: {jsonData.TotalDebt}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col>
                  <span>
                    Total Capitalization: {jsonData.TotalCapitalization}
                  </span>
                </Col>
                <Col>
                  <span>
                  Retained Earnings: {jsonData.RetainedEarnings}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
                <Col>
                  <span>
                    Current Assets: {jsonData.CurrentAssets}
                  </span>
                </Col>
                <Col>
                  <span>
                  Current Liabilities: {jsonData.CurrentLiabilities}
                  </span>
                </Col>
              </Row>
              <Row className={classes.cardDivider}></Row>
              <Container className={classes.cardSubSection}>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Accounts Receivable: {jsonData.AccountsReceivable}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Accounts Payable: {jsonData.AccountsPayable}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Inventory: {jsonData.Inventory}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Raw Materials: {jsonData.RawMaterials}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center mb-2">
                  <Col>
                    <span>
                    Work In Process: {jsonData.WorkInProcess}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Working Capital: {jsonData.WorkingCapital}
                    </span>
                  </Col>
                </Row>
              </Container>

              <Row className={classes.cardDivider}></Row>
              <Container className={classes.cardSubSection}>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Receivables: {jsonData.Receivables}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Cash And Cash Equivalents: {jsonData.CashAndCashEquivalents}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Additional Paid In Capital: {jsonData.AdditionalPaidInCapital}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Invested Capital: {jsonData.InvestedCapital}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Payables: {jsonData.Payables}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Payables And Accrued Expenses: {jsonData.PayablesAndAccruedExpenses}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center mb-2">
                  <Col>
                    <span>
                    Long Term Debt: {jsonData.LongTermDebt}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Net Debt: {jsonData.NetDebt}
                    </span>
                  </Col>
                </Row>
              </Container>

              <Row className={classes.cardDivider}></Row>
              <Container className={classes.cardSubSection}>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Total Non-Current Assets: {jsonData.TotalNonCurrentAssets}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Accumulated Depreciation: {jsonData.AccumulatedDepreciation}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Gross PPE: {jsonData.GrossPPE}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Net PPE: {jsonData.NetPPE}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Common Stock Equity: {jsonData.CommonStockEquity}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Stockholders Equity: {jsonData.StockholdersEquity}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Tangible Book Value: {jsonData.TangibleBookValue}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Share Issued: {jsonData.ShareIssued}
                    </span>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Card.Body>

        </Container>
      </section>

  );
};

export default BalanceSheetComponent;