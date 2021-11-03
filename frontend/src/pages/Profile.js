import { useAuth } from "../AuthContext";

const Profile = () => {
  const authContext = useAuth();
  const { username, email } = authContext.auth;
  return (
    <div>
      <div>{username}</div>
      <div>{email}</div>
    </div>
  );
};

export default Profile;
