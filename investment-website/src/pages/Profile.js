import PageContainer from "../containers/PageContainer";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteStockFromPortfolio, deleteStock } from "../store/authSlice";
import { Nav, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from "../store/authSlice";
import classes from "./Profile.module.css";
import axios from 'axios';
import moment from 'moment';

import formatModel from '../utils/formatUtils';

const Profile = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);
    const user = useSelector(state => state.auth.user)
    const user_id = useSelector(state => state.auth.user_id)
    const dispatch = useDispatch();

    useEffect(() => {
        // Make a GET request to API endpoint by stock ID
        axios.get(`http://localhost:3001/api/users/${user_id}`)
            .then(response => {
                const portfolioData = response.data.map((stock) => ({
                    ...stock,
                    exDividendDate: moment(stock.exDividendDate).format('M/DD/YYYY'),
                    previousClose: parseFloat(stock.previousClose).toFixed(2),
                    MarketValuePerShare: parseFloat(stock.MarketValuePerShare).toFixed(2),
                    targetMeanPrice: parseFloat(stock.targetMeanPrice).toFixed(2),
                    NominalValuePerShare: parseFloat(stock.NominalValuePerShare).toFixed(2)
                }));
                setData(portfolioData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [user_id, portfolio]); // include "id" in the dependency array

    // useEffect to fetch comments initially and whenever the component mounts or comments are posted
    useEffect(() => {
        fetchUserComments();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleDeleteStock = async (stockId) => {
        dispatch(deleteStockFromPortfolio(stockId));
        dispatch(deleteStock(stockId));

        if (user && stockId) {
            const response = await fetch(`http://localhost:3001/api/portfolio/${stockId}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    user_id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('button pushed, stock id to be deleted!')
                setPortfolio(response)

            } else {
                alert(response.statusText);
            }
        }
    };

    const fetchUserComments = async () => {
        // Make a GET request to API endpoint by stock ID
        axios.get(`http://localhost:3001/api/comments/user/${user_id}`)
            .then((response) => {
                const commentData = response.data.map((comment) => ({
                    ...comment,
                    created_at: formatModel.formatDate(comment.created_at)
                }));
                setComment(commentData);
                console.log(commentData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <PageContainer>
            <section>
                <Container>
                    <Row lg={1}>
                        <Card className="mb-3">
                            <Card.Header>
                                <Row className="align-items-center">
                                    <h1 className="d-flex bd-highlight">
                                        <div
                                            className="p-2 flex-grow-1 bd-highlight"
                                            id={classes.profileHeader}
                                        >
                                            Welcome, {user}!
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            <Button onClick={() => dispatch(logout())}>
                                                <Nav.Link as={Link} to={`/`}>Logout</Nav.Link>
                                            </Button>
                                        </div>
                                    </h1>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} md={4} className={classes.bodyLeftContainter}>
                                        <Row className={classes.bodyLeftInnerContainer}>
                                            <Card.Header className={classes.bodyLeftHeader}>
                                                Your Stock Comments are Below
                                            </Card.Header>
                                        </Row>
                                        <Row className={classes.bodyLeftInnerContainer}>
                                            <Card.Body>
                                                {comment.map((comment, index) => (
                                                    <div key={comment.id} className="align-items-center">
                                                        <Card.Header>
                                                            <Row className="align-items-center">
                                                                <div className="d-flex bd-highlight">
                                                                    <div className="flex-grow-1 bd-highlight">
                                                                        {comment.Ticker}
                                                                    </div>
                                                                    <span className={classes.commentDate}>
                                                                        {comment.created_at}
                                                                    </span>
                                                                </div>
                                                            </Row>
                                                        </Card.Header>
                                                        <Card.Body className={classes.commentBody}>
                                                            <div>
                                                                <Nav.Link as={Link} to={`/valuations/${comment.valuation_id}`}>
                                                                    {comment.comment}
                                                                </Nav.Link>
                                                            </div>
                                                        </Card.Body>
                                                    </div>
                                                ))}
                                            </Card.Body>
                                        </Row>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Row lg={3}>
                                            {data.map((stock, index) =>
                                                <div>
                                                    <Col>
                                                        <Card className='mb-3'>
                                                            <Card.Body>
                                                                <Card.Header className={classes.cardHeader}>
                                                                    <div>
                                                                        <h3 style={{ marginBottom: '0' }}>{stock.Ticker}</h3>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Text className={classes.cardBody}>
                                                                    <div style={{ fontStyle: 'italic', fontSize: '10px' }}>Ex Div Date: {stock.exDividendDate}</div>
                                                                    <div>Previous Close: {stock.previousClose}</div>
                                                                    <div>Market Value: {stock.MarketValuePerShare}</div>
                                                                    <div>Target Price: {stock.targetMeanPrice}</div>
                                                                    <div>NOM Price: {stock.NominalValuePerShare}</div>
                                                                </Card.Text>
                                                                <Card.Footer className={classes.cardFooter}>
                                                                    <Nav.Link as={Link} to={`/valuations/${stock.valuation_id}`}>
                                                                        <Button className={classes.cardButton}>
                                                                            {stock.Ticker}
                                                                        </Button>
                                                                    </Nav.Link>
                                                                    <div>
                                                                        <Button className={classes.cardDeleteButton}
                                                                            variant="danger" onClick={() => handleDeleteStock(stock.valuation_id)}>
                                                                            Delete Stock
                                                                        </Button>
                                                                    </div>
                                                                </Card.Footer>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </div>)}
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </section>
            <div>
                <div>
                    <Container>

                    </Container>
                </div>
            </div>
        </PageContainer>
    );
}

export default Profile;
