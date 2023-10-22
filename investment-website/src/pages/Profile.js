import PageContainer from "../containers/PageContainer";
import { useSelector } from "react-redux";

// import classes from "./Profile.module.css";

const Profile= () => {
  const user = useSelector((state) => state.auth.user)
  const user_id = useSelector((state) => state.auth.user_id)
  return (
    <PageContainer>
      <div>Profile Page</div>
      {user ? <h4>Welcome, {user}</h4> : null}
      {user_id ? <h4>UserId = {user_id}</h4> : null}
    </PageContainer>
  );
}

export default Profile;
