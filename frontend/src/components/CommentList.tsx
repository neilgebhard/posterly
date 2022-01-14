import Comment from "../components/Comment";
import { Post } from "../types";

type Props = {
  post: Post;
  fetchPost: () => void;
};

const CommentList = ({ post, fetchPost }: Props) => {
  if (post.comments.length === 0) {
    return (
      <div className="bg-white border border-gray-300 p-4 text-center py-5 px-1 text-gray-400 text-lg font-semibold">
        No comments yet
      </div>
    );
  }

  return (
    <ul className="bg-white border border-gray-300 p-4">
      {post.comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          postId={post._id}
          fetchPost={fetchPost}
        />
      ))}
    </ul>
  );
};

export default CommentList;
