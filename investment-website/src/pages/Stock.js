import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import axios from 'axios';

// import * as d3 from 'd3';
// import axios from 'axios';

import PageContainer from "../containers/PageContainer";
import classes from "./Game.module.css";

const Stock = () => {
  const user = useSelector((state) => state.auth.user);
  const user_id = useSelector((state) => state.auth.user_id);
  const portfolioIds = useSelector((state) => state.auth.portfolioIds);
  const [stock, setValuation] = useState([]);
  const [added, setAdded] = useState([]);
  // const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to API endpoint by ID
    axios.get(`http://localhost:3001/api/valuations/${id}`)
      .then(response => {
        setValuation(response.data);
        console.log(setValuation);
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

  const newPortfolioStock = async (req, res) => {

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
        added.push(id)
        console.log(added)

      } else {
        alert(response.statusText);
        // alert('Failed to create post');
      }
    }
  }

  

  // const addStock = (Ticker, id) => {
  //   console.log('button pushed!')
  //   axios.post(`http://localhost:3001/api/valuations/${id}/add-stock`, {Ticker})
  //   .then(res => {
  //     setError(null)
  //     if (res.data.added) {
  //       setAdded([...added, id])
  //     }
  //   })
  //   .catch(err => setError('Could not add stock'))
  // }

  return (
    <PageContainer title="Stock Details">
        <div>
          {/* <div>
            <svg ref={svgRef}></svg>
          </div> */}
          <div className={classes.detailHolder}>
            <h1 className={classes.stockTitle}>{stock.Ticker}</h1>
            <p>{user}, id = {user_id}</p>
            <p>{stock.previousClose}</p>
            <p>{stock.id}</p>

          </div>
        </div>
    </PageContainer>
  );
}

export default Stock;
