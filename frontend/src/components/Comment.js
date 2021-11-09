import { useState } from "react";
import { useAuth } from "../context/Auth";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import moment from "moment";

const Comment = ({ comment, postId, setPost }) => {
  const [isReplying, setIsReplying] = useState(false);
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();

  const handleClick = () => {
    setIsReplying((isReplying) => !isReplying);
  };

  const createdAt = moment(comment.createdAt).fromNow();

  return (
    <div className="space-y-2 mt-2">
      <div className="bg-white p-4">
        <div className="flex items-center gap-x-2">
          <div className="text-sm font-semibold">{comment.username}</div>
          <div className="text-gray-400">·</div>
          <div className="text-gray-400 text-xs">{createdAt}</div>
        </div>
        <div className="text-lg">{comment.text}</div>
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleClick}
            className="flex items-center gap-x-1 text-gray-400"
          >
            <ChatAlt2Icon className="w-5 h-5" />
            <span>reply</span>
          </button>
        )}
      </div>
      {isReplying && (
        <CreateReply
          comment={comment}
          postId={postId}
          setPost={setPost}
          setIsReplying={setIsReplying}
        />
      )}
      {comment.replies.map((reply) => (
        <Reply key={reply._id} reply={reply} />
      ))}
    </div>
  );
};

export default Comment;
