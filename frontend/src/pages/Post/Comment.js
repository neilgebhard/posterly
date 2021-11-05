import { useState } from "react";
import CreateReply from "./CreateReply";
import { useAuth } from "../../AuthContext";

const Comment = ({ comment, postId, setPost }) => {
  const [isReplying, setIsReplying] = useState(false);
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();

  const handleClick = () => {
    setIsReplying(true);
  };

  return (
    <>
      <p>
        {comment.text} by {comment.username}
      </p>
      {isAuthenticated && (
        <button type="button" onClick={handleClick}>
          reply
        </button>
      )}
      {isReplying && (
        <CreateReply
          comment={comment}
          postId={postId}
          setPost={setPost}
          setIsReplying={setIsReplying}
        />
      )}
      {comment.replies.map((reply) => (
        <p key={reply._id}>
          {reply.text} by {reply.username}
        </p>
      ))}
    </>
  );
};

export default Comment;
