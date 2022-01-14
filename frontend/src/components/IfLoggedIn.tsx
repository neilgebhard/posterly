import { useAuth } from "../context/Auth";

type Props = {
  children: React.ReactNode;
};

const IfLoggedIn = ({ children }: Props) => {
  const auth = useAuth();

  return <>{auth.isAuthenticated() ? <div>{children}</div> : null}</>;
};

export default IfLoggedIn;
