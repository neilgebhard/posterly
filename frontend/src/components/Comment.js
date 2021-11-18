import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/Auth";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import CreatedAt from "./CreatedAt";
import Flex from "../ui/Flex";
import { ChatAlt2Icon, TrashIcon } from "@heroicons/react/solid";

const Comment = ({ comment, postId, fetchPost }) => {
  const [showReply, setShowReply] = useState(false);

  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();
  const { username } = authContext.auth;

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${postId}/comments/${comment._id}`);
    fetchPost();
  };

  const isByUser = username === comment.username;

  const replyButton = isAuthenticated ?? (
    <button
      id="reply-btn"
      type="button"
      onClick={() => setShowReply((showReply) => !showReply)}
      className="flex items-center gap-x-1 text-gray-400"
    >
      <ChatAlt2Icon className="w-5 h-5" />
      <span>reply</span>
    </button>
  );

  const deleteButton = isByUser ?? (
    <Flex
      id="delete-btn"
      className="text-gray-400 hover:text-gray-500 cursor"
      role="button"
      onClick={handleDelete}
    >
      <TrashIcon className="w-4 h-4" />
      <span>delete</span>
    </Flex>
  );

  const replies = comment.replies.map((reply) => (
    <Reply
      key={reply._id}
      reply={reply}
      postId={postId}
      commentId={comment._id}
      fetchPost={fetchPost}
    />
  ));

  const createReply = showReply ?? (
    <CreateReply
      comment={comment}
      postId={postId}
      setShowReply={setShowReply}
      fetchPost={fetchPost}
    />
  );

  return (
    <li className="space-y-2 mt-2">
      <div className="bg-white p-4">
        <div className="flex items-center gap-x-2">
          <div className="text-sm font-semibold">{comment.username}</div>
          <div className="text-gray-400">·</div>
          <CreatedAt createdAt={comment.createdAt} />
        </div>
        <p className="text-lg">{comment.text}</p>
        <div className="flex items-center justify-between">
          {replyButton}
          {deleteButton}
        </div>
      </div>
      {createReply}
      <ul className="space-y-2">{replies}</ul>
    </li>
  );
};

export default Comment;
