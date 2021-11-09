import classnames from "classnames";

const Flex = ({ className, ...rest }) => {
  return (
    <div
      className={classnames("flex items-center gap-x-1", className)}
      {...rest}
    />
  );
};

export default Flex;
