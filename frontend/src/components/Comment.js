import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useAuth } from "../context/Auth";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import Flex from "../ui/Flex";
import { ChatAlt2Icon, TrashIcon } from "@heroicons/react/solid";

const Comment = ({ comment, postId, fetchPost }) => {
  const [isReplying, setIsReplying] = useState(false);

  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();
  const { username } = authContext.auth;

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${postId}/comments/${comment._id}`);
    fetchPost();
  };

  const createdAt = moment(comment.createdAt).fromNow();
  const isByUser = comment.username === username;

  return (
    <li className="space-y-2 mt-2">
      <div className="bg-white p-4">
        <div className="flex items-center gap-x-2">
          <div className="text-sm font-semibold">{comment.username}</div>
          <div className="text-gray-400">·</div>
          <time className="text-gray-400 text-xs">{createdAt}</time>
        </div>
        <p className="text-lg">{comment.text}</p>
        <div className="flex items-center justify-between">
          {isAuthenticated && (
            <button
              id="reply-btn"
              type="button"
              onClick={() => setIsReplying((isReplying) => !isReplying)}
              className="flex items-center gap-x-1 text-gray-400"
            >
              <ChatAlt2Icon className="w-5 h-5" />
              <span>reply</span>
            </button>
          )}
          {isByUser && (
            <Flex
              id="delete-btn"
              className="text-gray-400 hover:text-gray-500 cursor"
              role="button"
              onClick={handleDelete}
            >
              <TrashIcon className="w-4 h-4" />
              <span>delete</span>
            </Flex>
          )}
        </div>
      </div>
      {isReplying && (
        <CreateReply
          comment={comment}
          postId={postId}
          setIsReplying={setIsReplying}
          fetchPost={fetchPost}
        />
      )}
      <ul className="space-y-2">
        {comment.replies.map((reply) => (
          <Reply
            key={reply._id}
            reply={reply}
            postId={postId}
            commentId={comment._id}
            fetchPost={fetchPost}
          />
        ))}
      </ul>
    </li>
  );
};

export default Comment;
