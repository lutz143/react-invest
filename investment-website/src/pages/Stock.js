import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import * as d3 from 'd3';
import axios from 'axios';

import PageContainer from "../containers/PageContainer";
import classes from "./Game.module.css";


const Stock = () => {
  const [stock, setValuation] = useState([]);
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

  const svgRef = useRef();

  return (
    <PageContainer title="Stock Details">
        <div>
          <h1>Hello</h1>
          <div>
            <svg ref={svgRef}></svg>
          </div>
          <div className={classes.detailHolder}>
            <h1 className={classes.stockTitle}>{stock.Ticker}</h1>
            <p>
              {stock.previousClose}
            </p>
          </div>
        </div>
    </PageContainer>
  );
}

export default Stock;
