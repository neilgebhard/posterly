import classnames from "classnames";

type AppProps = {
  id?: string;
  role?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Flex = ({ children, className, ...rest }: AppProps) => {
  return (
    <div
      className={classnames("flex items-center gap-x-1", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Flex;
