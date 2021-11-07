import { ChatAltIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import moment from "moment";

const PostItem = ({ post }) => {
  const numComments = post?.comments.reduce((acc, comment) => {
    return comment.replies.length + 1;
  }, 0);

  const createdAt = moment(post.createdAt).fromNow();

  return (
    <div key={post._id} className="bg-white p-4 mb-4 rounded">
      <div className="flex items-center gap-x-2">
        <div className="text-gray-400 text-xs">Posted by {post.username}</div>
        <div className="text-gray-400">·</div>
        <div className="text-gray-400 text-xs">{createdAt}</div>
      </div>
      <div className="text-2xl text-bold font-semibold">
        {post.url ? <a href={post.url}>{post.title}</a> : <>{post.title}</>}
      </div>
      <div>{post.body}</div>
      <Link
        to={`/posts/${post._id}`}
        className="flex items-center gap-x-1 text-gray-400 hover:text-gray-500"
      >
        <ChatAltIcon className="w-4 h-4" />
        <div>{numComments} comments</div>
      </Link>
    </div>
  );
};

export default PostItem;
