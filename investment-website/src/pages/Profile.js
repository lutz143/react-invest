import PageContainer from "../containers/PageContainer";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteStockFromPortfolio, deleteStock } from "../store/authSlice";
import { Nav, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from "./Profile.module.css";
import axios from 'axios';
import moment from 'moment';

// import classes from "./Profile.module.css";


const Profile= () => {
  const [portfolio, setPortfolio] = useState([]);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.auth.user)
  const user_id = useSelector(state => state.auth.user_id)
  const portfolioIds = useSelector(state => state.auth.portfolioIds)
  const dispatch = useDispatch();

  useEffect(() => {
    // Make a GET request to API endpoint by stock ID
    axios.get(`http://localhost:3001/api/users/${user_id}`)
      .then(response => {
        const portfolioData = response.data.portfolio_stocks.map((stock) => ({
          ...stock,
          Assessment_Date: moment(stock.Assessment_Date).format('M/DD/YYYY'),
          previousClose: parseFloat(stock.previousClose).toFixed(2),
          CAGR_CPS: parseFloat(stock.CAGR_CPS).toFixed(2),
          NOM_CPS: parseFloat(stock.NOM_CPS).toFixed(2),
          CON_CPS: parseFloat(stock.CON_CPS).toFixed(2)
        }));
        setData(portfolioData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
  }, [user_id, portfolio]); // include "id" in the dependency array

  const handleDeleteStock = async(stockId) => {
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
  
  return (
    <PageContainer>
    <div>
      <h1>{user} Profile</h1>
      {user && (
        <div>
          <p>User ID: {user_id}</p>
          <p>Portfolio IDs:</p>
          {/* <ul>
            {data.map((stock, index) => (
              <li key={stock.id}>
                {stock.id} <button onClick={() => handleDeleteStock(stock.id)}>Delete</button>
              </li>
            ))}
          </ul> */}

        <Container>
          <Row lg={4}>
            {data.map((stock, index) =>
              <div>
                <Col>
                  <Card className='mb-3'>
                    <Card.Body>
                      <Card.Header className={classes.cardHeader}>
                        <div>
                          <h3 style={{marginBottom: '0'}}>{stock.id}: {stock.Ticker}</h3>
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
                        <Button className={classes.cardDeleteButton}
                        variant="danger" onClick={() => handleDeleteStock(stock.id)}>
                          Delete Stock
                        </Button>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              </div>)}
            </Row>
        </Container>
        </div>
      )}
    </div>
    </PageContainer>
  );
}

export default Profile;
