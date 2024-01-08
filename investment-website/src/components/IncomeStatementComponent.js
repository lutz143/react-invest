import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";

import classes from "../pages/Stock.module.css";
import formatModel from '../utils/formatUtils';

const IncomeStatementComponent = () => {
  const [jsonData, setJsonData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/incomeStatement/${id}`)
      .then((response) => {
        const incomeStatementData = response.data;

        // Iterate through balanceSheetData fields and apply formatting
        const formattedData = Object.keys(incomeStatementData).reduce((acc, key) => {
          if (typeof incomeStatementData[key] === 'number') {
            if (key === 'BasicEPS' || key === 'DilutedEPS') {
              acc[key] = formatModel.formatDecimal(incomeStatementData[key]);
            } else {
              acc[key] = formatModel.formatInteger(incomeStatementData[key]);
            }
          } else {
            if (key === 'BasicEPS' || key === 'DilutedEPS' || key === 'TaxRateForCalcs') {
              acc[key] = formatModel.formatDecimal(incomeStatementData[key]);
            } else {
              acc[key] = incomeStatementData[key];
            }
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
                  Basic Average Shares: {jsonData.BasicAverageShares}
                  </span>
                </Col>
                <Col>
                  <span>
                  Basic EPS: {jsonData.BasicEPS}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
                <Col>
                  <span>
                  Diluted Average Shares: {jsonData.DilutedAverageShares}
                  </span>
                </Col>
                <Col>
                  <span>
                  Diluted EPS: {jsonData.DilutedEPS}
                  </span>
                </Col>
              </Row>
              <Row className={classes.cardDivider}></Row>
              <Row className="align-items-center">
                <Col>
                  <span>
                  Gross Profit: {jsonData.GrossProfit}
                  </span>
                </Col>
                <Col>
                  <span>
                  Net Income: {jsonData.NetIncome}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col>
                  <span>
                  EBIT: {jsonData.EBIT}
                  </span>
                </Col>
                <Col>
                  <span>
                  EBITDA: {jsonData.EBITDA}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
                <Col>
                  <span>
                  Net Income Continuous Operations: {jsonData.NetIncomeContinuousOperations}
                  </span>
                </Col>
                <Col>
                  <span>
                  Operating Income: {jsonData.OperatingIncome}
                  </span>
                </Col>
              </Row>
              <Row className={classes.cardDivider}></Row>

              <Container className={classes.cardSubSection}>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Total Revenue: {jsonData.TotalRevenue}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Operating Revenue: {jsonData.OperatingRevenue}
                    </span>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col>
                    <span>
                    Cost Of Revenue: {jsonData.CostOfRevenue}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Operating Expense: {jsonData.OperatingExpense}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center mb-2">
                  <Col>
                    <span>
                    Total Expenses: {jsonData.TotalExpenses}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Tax Rate for Calcs: {jsonData.TaxRateForCalcs}
                    </span>
                  </Col>
                </Row>
              </Container>

              <Row className={classes.cardDivider}></Row>
              <Container className={classes.cardSubSection}>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    General & Administrative Expense: {jsonData.GeneralAndAdministrativeExpense}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Research & Development: {jsonData.ResearchAndDevelopment}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Salaries & Wages: {jsonData.SalariesAndWages}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Interest Expense: {jsonData.InterestExpense}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                    Selling & Marketing Expense: {jsonData.SellingAndMarketingExpense}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Selling General & Administration: {jsonData.SellingGeneralAndAdministration}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center mb-2">
                  <Col>
                    <span>
                    Amortization: {jsonData.Amortization}
                    </span>
                  </Col>
                  <Col>
                    <span>
                    Write Off: {jsonData.WriteOff}
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

export default IncomeStatementComponent;