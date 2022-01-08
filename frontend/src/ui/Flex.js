import classnames from "classnames";

type AppProps = {
  className?: String,
};

const Flex = ({ className, ...rest }: AppProps) => {
  return (
    <div
      className={classnames("flex items-center gap-x-1", className)}
      {...rest}
    />
  );
};

export default Flex;
