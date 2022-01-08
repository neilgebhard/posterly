import { useAuth } from "../context/Auth";

type AppProps = {
  children: React.ReactNode;
  username: string;
};

const IfUser = ({ children, username }: AppProps) => {
  const { auth } = useAuth();

  return <>{auth.username === username ? <div>{children}</div> : null}</>;
};

export default IfUser;
