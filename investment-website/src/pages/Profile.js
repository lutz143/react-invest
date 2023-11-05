import PageContainer from "../containers/PageContainer";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteStockFromPortfolio, deleteStock } from "../store/authSlice";
import axios from 'axios';

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
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>User ID: {user_id}</p>
          <p>Username: {user}</p>
          
          <p>Portfolio IDs:</p>
          <ul>
            {data.map((stock, index) => (
              <li key={stock.id}>
                {stock.id} <button onClick={() => handleDeleteStock(stock.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </PageContainer>
  );
}

export default Profile;
