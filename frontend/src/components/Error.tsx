type Props = {
  error: string;
};

const Error = ({ error }: Props) => {
  return <div className="text-red-500">{error}</div>;
};

export default Error;
