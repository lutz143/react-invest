import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";

import classes from "../pages/Stock.module.css";


const CashFlowComponent = () => {
  const [jsonData, setJsonData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/cashFlow/${id}`)
      .then((response) => {
        const cashFlowData = response.data;
        console.log(cashFlowData);
        setJsonData(cashFlowData);
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
                    Net Income: {jsonData.NetIncome}
                  </span>
                </Col>
                <Col>
                  <span>
                    Net Income from Cont Ops: {jsonData.NetIncomeFromContinuingOperations}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col>
                  <span>
                    Free Cash Flow: {jsonData.FreeCashFlow}
                  </span>
                </Col>
                <Col>
                  <span>
                    Change in Cash: {jsonData.ChangesInCash}
                  </span>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
                <Col>
                  <span>
                    Beg Cash Position: {jsonData.BeginningCashPosition}
                  </span>
                </Col>
                <Col>
                  <span>
                    End Cash Position: {jsonData.EndCashPosition}
                  </span>
                </Col>
              </Row>
              <Row className={classes.cardDivider}></Row>
              <Container className={classes.cardSubSection}>
                <Row className="align-items-center">
                  <Col>
                    <span>
                      Cash Div Paid: {jsonData.CashDividendsPaid}
                    </span>
                  </Col>
                  <Col>
                    <span>
                      Capital Expenditure: {jsonData.CapitalExpenditure}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                      Operating Cash Flow: {jsonData.OperatingCashFlow}
                    </span>
                  </Col>
                  <Col>
                    <span>
                      Cash Flow from Cont Operating Activity: {jsonData.CashFlowFromContinuingOperatingActivities}
                    </span>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <span>
                      Change in Working Cap: {jsonData.ChangeInWorkingCapital}
                    </span>
                  </Col>
                  <Col>
                    <span>
                      Operating Gain/Loss: {jsonData.OperatingGainsLosses}
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

export default CashFlowComponent;