import React, { useState, useEffect } from 'react';
import PageContainer from "../containers/PageContainer";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import { Nav, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

import axios from 'axios';

function Home() {
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)

  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to API endpoint
    axios.get('http://localhost:3001/api/valuations/')
      .then(response => {
        const formattedData = response.data.map((stock) => ({
          ...stock,
          Assessment_Date: moment(stock.Assessment_Date).format('M/DD/YYYY'),
          previousClose: parseFloat(stock.previousClose).toFixed(2),
          CAGR_CPS: parseFloat(stock.CAGR_CPS).toFixed(2),
          NOM_CPS: parseFloat(stock.NOM_CPS).toFixed(2),
          CON_CPS: parseFloat(stock.CON_CPS).toFixed(2)
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <PageContainer>
      <section>
        <Container>
          <Row lg={4}>
            {data.map((stock, index) =>
              <div>
                <Col>
                  <Card className='mb-3'>
                    <Card.Body>
                      <Card.Header className={classes.cardHeader}>
                        <div>
                          <h3 style={{marginBottom: '0'}}>{stock.Ticker}</h3>
                        </div>
                      </Card.Header>
                      <Card.Text className={classes.cardBody}>
                        <div style={{fontStyle: 'italic', fontSize: '10px'}}>Assessment Date: {stock.Assessment_Date}</div>
                        <div>Previous Close: {stock.previousClose}</div>
                        <div>CAGR CPS: {stock.CAGR_CPS}</div>
                        <div>NOM CPS: {stock.NOM_CPS}</div>
                        <div>CON CPS: {stock.CON_CPS}</div>
                      </Card.Text>
                      <Card.Footer className={classes.cardFooter}>
                        <Button className={classes.cardButton}>
                          <Nav.Link as={Link} to={`/valuations/${stock.id}`}>{stock.Ticker}</Nav.Link>
                        </Button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              </div>)}
            </Row>
          </Container>
      </section>
    </PageContainer>
  );
}

export default Home