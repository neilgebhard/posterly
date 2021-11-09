import classnames from "classnames";

const Flex = ({ children, className, ...rest }) => {
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
