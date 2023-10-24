import PageContainer from "../containers/PageContainer";
import { useSelector } from "react-redux";

// import classes from "./Profile.module.css";

const Profile= () => {
  const user = useSelector(state => state.auth.user)
  const user_id = useSelector(state => state.auth.user_id)
  const portfolioIds = useSelector(state => state.auth.portfolioIds)

  console.log('at profile page.');
  console.log(portfolioIds);
  
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
            {portfolioIds.map(id => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </PageContainer>
  );
}

export default Profile;
