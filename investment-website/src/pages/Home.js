import React, { useState, useEffect } from 'react';
import PageContainer from "../containers/PageContainer";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import { Nav } from 'react-bootstrap';

import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to your API endpoint
    axios.get('http://localhost:3001/api/valuations/') // Replace with your API URL
      .then(response => {
        setData(response.data); // Assuming the response is an array of data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <PageContainer>
      {/* <section className={classes.gridContainer}>
        {data.map(item => (
          <li key={item.id}>{item.id} {item.Ticker} {item.Assessment_Date} {item.previousClose}</li>
        ))}
      </section> */}

      <section className={classes.gridContainer}>
        {data.map((stock, index) => 
          <Nav.Link className={classes.gridCard} as={Link} to={`/stock/${stock.id}`}>            
            <p>{stock.Ticker}</p>
            <p>{stock.Assessment_Date}</p>
            <p>{stock.previousClose}</p>
          </Nav.Link>)}
      </section>



    </PageContainer>
  );
}

export default Home