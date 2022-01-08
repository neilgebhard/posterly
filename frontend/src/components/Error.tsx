type AppProps = {
  error: string;
};

const Error = ({ error }: AppProps) => {
  return <div className="text-red-500">{error}</div>;
};

export default Error;
