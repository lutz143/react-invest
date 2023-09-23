import React, { useState, useEffect } from 'react';
import PageContainer from "../containers/PageContainer";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import { Nav, Button, Card } from 'react-bootstrap';
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
          Assessment_Date: moment(stock.Assessment_Date).format('M/DD/YYYY') // Format the date as you desire
        }));
        setData(formattedData);
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
                  <div style={{fontStyle: 'italic', fontSize: '10px'}}>Assessment Date: {stock.Assessment_Date}</div>
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