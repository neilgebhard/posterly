import axios from "axios";
import { useState } from "react";
import IfUser from "./IfUser";
import IfLoggedIn from "./IfLoggedIn";
import DeleteButton from "./DeleteButton";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import CreatedAt from "./CreatedAt";
import ReplyButton from "./ReplyButton";
import type { Comment as CommentType } from "../types";

type Props = {
  comment: CommentType;
  postId: string;
  fetchPost: () => void;
};

const Comment = ({ comment, postId, fetchPost }: Props) => {
  const [showReply, setShowReply] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${postId}/comments/${comment._id}`);
    fetchPost();
  };

  return (
    <li className="space-y-2 mt-2">
      <div className="">
        <div className="flex items-center gap-x-2">
          <div className="text-sm font-semibold">{comment.username}</div>
          <div className="text-gray-400">·</div>
          <CreatedAt createdAt={comment.createdAt} />
        </div>
        <p className="text-sm">{comment.text}</p>
        <div className="flex items-center justify-between">
          <IfLoggedIn>
            <ReplyButton
              onClick={() => setShowReply((showReply) => !showReply)}
            >
              reply
            </ReplyButton>
          </IfLoggedIn>
        </div>
      </div>
      <IfUser username={comment.username}>
        <DeleteButton data-testid="delete-comment" onClick={handleDelete}>
          delete
        </DeleteButton>
      </IfUser>
      {showReply && (
        <CreateReply
          comment={comment}
          postId={postId}
          setShowReply={setShowReply}
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
