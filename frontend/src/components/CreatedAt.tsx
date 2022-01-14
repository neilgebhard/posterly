import moment from "moment";

type Props = {
  createdAt: string;
};

const CreatedAt = ({ createdAt }: Props) => {
  const timeSince = moment(createdAt).fromNow();

  return <time className="text-gray-400 text-xs">{timeSince}</time>;
};

export default CreatedAt;
