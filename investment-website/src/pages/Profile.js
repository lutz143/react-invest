import PageContainer from "../containers/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { deleteStockFromPortfolio, deleteStock } from "../store/authSlice";
import axios from "axios";

// import classes from "./Profile.module.css";


const Profile= () => {
  const user = useSelector(state => state.auth.user)
  const user_id = useSelector(state => state.auth.user_id)
  const portfolioIds = useSelector(state => state.auth.portfolioIds)
  const dispatch = useDispatch();

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
            {portfolioIds.map(stockId => (
              <li key={stockId}>
                {stockId} <button onClick={() => handleDeleteStock(stockId)}>Delete</button>
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
