import React, { useState, useEffect } from 'react';
import PageContainer from "../containers/PageContainer";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import { Nav, Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

import axios from 'axios';


function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Make a GET request to API endpoint
        axios.get('http://localhost:3001/api/valuations/')
            .then(response => {
                const formattedData = response.data.map((stock) => ({
                    ...stock,
                    Valuation_Date: moment(stock.Valuation_Date).format('M/DD/YYYY'),
                    previousClose: parseFloat(stock.previousClose).toFixed(2),
                    previousCloseFloat: stock.previousClose,
                    MarketValuePerShare: parseFloat(stock.MarketValuePerShare).toFixed(2),
                    targetMeanPrice: parseFloat(stock.targetMeanPrice).toFixed(2),
                    NominalValuePerShare: parseFloat(stock.NominalValuePerShare).toFixed(2)
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
                                            <Card.Header className={stock.NominalValuePerShare > stock.previousCloseFloat ? classes.cardHeaderGood : classes.cardHeader}>
                                                <div>
                                                    <h3 style={{ marginBottom: '0' }}>{stock.Ticker}</h3>
                                                </div>
                                            </Card.Header>
                                            <Card.Text className={classes.cardBody}>
                                                <div style={{ fontStyle: 'italic', fontSize: '10px' }}>Valuation Date: {stock.Valuation_Date}</div>
                                                <div>Previous Close: {stock.previousClose}</div>
                                                <div>Market Value: {stock.MarketValuePerShare}</div>
                                                <div>Target Price: {stock.targetMeanPrice}</div>
                                                <div>NOM Price: {stock.NominalValuePerShare}</div>
                                            </Card.Text>
                                            <Card.Footer className={classes.cardFooter}>
                                                <Nav.Link as={Link} to={`/valuations/${stock.ticker_id}`}>
                                                    <Button className={classes.cardButton}>
                                                        {stock.Ticker}
                                                    </Button>
                                                </Nav.Link>
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

export default Home;