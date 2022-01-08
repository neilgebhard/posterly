import { useAuth } from "../context/Auth";

type AppProps = {
  children: React.ReactNode;
};

const IfLoggedIn = ({ children }: AppProps) => {
  const auth = useAuth();

  return <>{auth.isAuthenticated() ? <div>{children}</div> : null}</>;
};

export default IfLoggedIn;
