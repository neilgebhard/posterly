import { useAuth } from "../context/Auth";

type Props = {
  children: React.ReactNode;
  username: string;
};

const IfUser = ({ children, username }: Props) => {
  const { auth } = useAuth();

  return <>{auth.username === username ? <div>{children}</div> : null}</>;
};

export default IfUser;
