import moment from "moment";

const Reply = ({ reply }) => {
  const createdAt = moment(reply.createdAt).fromNow();
  return (
    <div key={reply._id} className="ml-10 bg-white p-2">
      <div className="flex items-center gap-x-2 ">
        <div className="text-sm font-semibold">{reply.username}</div>
        <div className="text-gray-400">·</div>
        <div className="text-gray-400 text-xs">{createdAt}</div>
      </div>
      <div>{reply.text}</div>
    </div>
  );
};

export default Reply;
