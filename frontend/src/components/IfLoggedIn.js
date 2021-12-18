import { useAuth } from "../context/Auth";

const IfLoggedIn = ({ children }) => {
  const isAuthenticated = useAuth().isAuthenticated();

  return <>{isAuthenticated ? <div>{children}</div> : null}</>;
};

export default IfLoggedIn;
