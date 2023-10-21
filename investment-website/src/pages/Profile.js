import PageContainer from "../containers/PageContainer";
import { useSelector } from "react-redux";

// import classes from "./Profile.module.css";

const Profile= () => {
  const user = useSelector((state) => state.auth.user)
  return (
    <PageContainer>
      <div>Profile Page</div>
      {user ? <h4>Welcome, {user}</h4> : null}
    </PageContainer>
  );
}

export default Profile;
