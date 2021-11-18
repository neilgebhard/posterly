import moment from "moment";

const CreatedAt = ({ createdAt }) => {
  const timeSince = moment(createdAt).fromNow();
  return <time className="text-gray-400 text-xs">{timeSince}</time>;
};

export default CreatedAt;
