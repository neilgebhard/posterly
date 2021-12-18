import { useAuth } from "../context/Auth";

const IfUser = ({ children, username }) => {
  const { auth } = useAuth();

  return <>{auth.username === username ? <div>{children}</div> : null}</>;
};

export default IfUser;
