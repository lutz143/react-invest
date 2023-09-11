import React from 'react';
import { useState, useEffect } from 'react';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import Card from './Card';
// import SearchForm from './SearchForm';
import MovieDetail from './MovieDetail';
import API from '../utils/API';

// can remove after test:
import axios from 'axios';



function DataRenderer() {
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
    <div>
      <h1>Data from API Endpoint:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.ticker}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataRenderer;
