import classnames from "classnames";

type Props = {
  id?: string;
  role?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Flex = ({ children, className, ...rest }: Props) => {
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
