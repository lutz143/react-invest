import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useSelector } from "react-redux";
import axios from 'axios';
import Papa from 'papaparse';
import moment from 'moment';
// import * as d3 from 'd3';
// import axios from 'axios';

import classes from "./Stock.module.css";

import PageContainer from "../containers/PageContainer";

const Stock = () => {
  const user = useSelector((state) => state.auth.user);
  const user_id = useSelector((state) => state.auth.user_id);
  const portfolioIds = useSelector((state) => state.auth.portfolioIds);
  const [stock, setValuation] = useState([]);
  const [added, setAdded] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to API endpoint by stock ID
    axios.get(`http://localhost:3001/api/valuations/${id}`)
      .then(response => {
        const stock = response.data
        const formattedData = {
          ...stock,
          Assessment_Date: moment(stock.Assessment_Date).format('M/DD/YYYY'),
          previousClose: parseFloat(stock.previousClose).toFixed(2),
          previousCloseFloat: stock.previousClose,
          CAGR_CPS: parseFloat(stock.CAGR_CPS).toFixed(2),
          NOM_CPS: parseFloat(stock.NOM_CPS).toFixed(2),
          CON_CPS: parseFloat(stock.CON_CPS).toFixed(2),
          CONF_NOM: parseFloat(stock.CONF_NOM).toFixed(0),
          toolTip_CONF_CAGR: "CAGR Confidence: " + parseFloat(stock.CONF_CAGR).toFixed(0),
          marketCap: (stock.marketCap).toLocaleString('en-US'),
          sharesOutstanding: (stock.sharesOutstanding).toLocaleString('en-US'),
          Terminal_Rate: (stock.Terminal_Rate * 100).toFixed(1) + "%",
          WACC: (stock.WACC * 100).toFixed(1) + "%",
          toolTip_Swing_NOM: "NOM-CON Swing: " + (stock.Swing_NOM * 100).toFixed(1) + "%",
          toolTip_TerminalValue_NOM: "NOM Terminal Value: " + (stock.TerminalValue_NOM).toLocaleString('en-US'),
          toolTip_NPV_Total_NOM: "NOM NPV: " + (stock.NPV_Total_NOM).toLocaleString('en-US'),
        }
        setValuation(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      // set up svg
      // set up scaling
      // set up the axes
      // set up the data for svg
      
  }, [id]); // include "id" in the dependency array

  // const svgRef = useRef();

  const downloadCsv = () => {
    // convert stock data to CSV format
    const stockArray = [stock];
    const csv = Papa.unparse(stockArray);
    
    // trigger download option
    downloadFile(csv, 'data.csv');
  }

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const newPortfolioStock = async (event) => {

    if (user && id) {
      const response = await fetch(`http://localhost:3001/api/valuations/${id}/add-stock`, {
        method: 'POST',
        body: JSON.stringify({
          user_id,
          valuation_id: id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('button pushed, stock id sent!')
        setAdded(id)

      } else {
        alert(response.statusText);
        // alert('Failed to create post');
      }
    }
  }

  return (
    <PageContainer title="Stock Details">
      <section>
        <Container>
          <Row lg={1}>
            <Card className='mb-3'>
              <Card.Header>
                <Row className='align-items-center'>
                  <h1 className='d-flex bd-highlight'>
                    <div className='p-2 flex-grow-1 bd-highlight'>
                      {stock.Ticker}
                    </div>
                    <div className='p-2 bd-highlight align-items-center'>
                      {user ? <div>
                        {added.includes(stock.id) || portfolioIds.includes(stock.id) ? <div className='p-3 bd-highlight align-items-center' style={{fontSize: '14px'}}>Added!</div> : <Button onClick={() => newPortfolioStock()}>Add Stock</Button>}
                      </div> : null}
                    </div>
                    <div className='p-2 bd-highlight'>
                      <Button onClick={downloadCsv} style={{fontSize: '14px'}}>
                        &#11123;
                      </Button>
                    </div>
                    
                  </h1>                    
                </Row>
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>Previous Close: {stock.previousClose}</Col>
                    <Col>
                      <span data-tooltip-id="cagr-conf-tooltip">                        
                        CAGR Estimate: {stock.CAGR_CPS}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span data-tooltip-id="nom-con-tooltip">
                        Nominal Estimate: {stock.NOM_CPS}
                      </span>
                    </Col>
                    <Col>
                      <span data-tooltip-id="nom-con-tooltip">
                        Conservative Estimate: {stock.CON_CPS}
                      </span>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col>
                      <span>
                        Confidence: {stock.CONF_NOM}
                      </span>
                    </Col>
                  </Row>
                </Container>
                <Row className={classes.cardDivider}></Row>

                <Container className={classes.cardSubSection}>
                  <Row>
                    <Col>Market Cap: {stock.marketCap}</Col>
                    <Col>Shares Outstanding: {stock.sharesOutstanding}</Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col>
                      <span data-tooltip-id="terminal-value-tooltip">
                        Terminal Rate: {stock.Terminal_Rate}
                      </span>
                    </Col>
                    <Col>
                      <span data-tooltip-id="nom-npv-tooltip">
                        WACC: {stock.WACC}
                      </span>
                    </Col>
                  </Row>
                </Container>

              </Card.Body>
            </Card>
          </Row>

          {/* <div>
            <svg ref={svgRef}></svg>
          </div> */}
            
            {error ? <p>{error}</p>: null}


        </Container>

          <ReactTooltip
            id="nom-con-tooltip"
            place="bottom"
            content= {stock.toolTip_Swing_NOM}
          />
          <ReactTooltip
            id="terminal-value-tooltip"
            place="bottom"
            content= {stock.toolTip_TerminalValue_NOM}
          />
          <ReactTooltip
            id="nom-npv-tooltip"
            place="bottom"
            content= {stock.toolTip_NPV_Total_NOM}
          />
          <ReactTooltip
            id="cagr-conf-tooltip"
            place="bottom"
            content= {stock.toolTip_CONF_CAGR}
          />
      </section>
    </PageContainer>
  );
}

export default Stock;