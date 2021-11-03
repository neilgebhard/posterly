import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

const Navbar = () => {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();
  const { username } = authContext.auth;

  const handleLogout = () => {
    authContext.logout();
    axios.post("/api/logout");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <Link to="/profile">{username}</Link>
            </li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
