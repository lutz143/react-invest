import React, { useState, useEffect } from 'react';
import PageContainer from "../containers/PageContainer";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import { Nav, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

function Home() {

  // const [data, setStockData] = useState([]);

  // useEffect(() => {
    // Make an API request to backend to fetch the most recent stock data
  //   axios.get('http://localhost:3001/api/recents/') // Replace with your API endpoint
  //     .then((response) => {
  //       setStockData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching stock data:', error);
  //     });
  // }, []);


  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to API endpoint
    axios.get('http://localhost:3001/api/valuations/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <PageContainer>
      <section className={classes.gridContainer}>
        {data.map((stock, index) =>
          <div>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Header className={classes.cardHeader}>
                  <div>
                    <h3 style={{marginBottom: '0'}}>{stock.Ticker}</h3>
                  </div>
                </Card.Header>
                <Card.Text>
                  <div>{stock.Assessment_Date}</div>
                  <div>{stock.previousClose}</div>
                  <div>{stock.CAGR_CPS}</div>
                  <div>{stock.NOM_CPS}</div>
                  <div>{stock.CON_CPS}</div>
                </Card.Text>
                <Button>
                  <Nav.Link as={Link} to={`/valuations/${stock.id}`}>{stock.Ticker}</Nav.Link>
                </Button>
              </Card.Body>
            </Card>
          </div>)}
      </section>
    </PageContainer>
  );
}

export default Home