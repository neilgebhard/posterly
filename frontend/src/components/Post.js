import axios from "axios";
import Flex from "../ui/Flex";
import { ChatAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../context/Auth";

const PostItem = ({ post, removePost }) => {
  const AuthContext = useAuth();
  const { username } = AuthContext.auth;

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${post._id}`);
    removePost(post._id);
  };

  const numComments = post?.comments.reduce((acc, comment) => {
    return acc + comment.replies.length + 1;
  }, 0);

  const createdAt = moment(post.createdAt).fromNow();

  const isByUser = post.username === username;

  return (
    <div key={post._id} className="bg-white p-4 mb-4 rounded">
      <Flex className="gap-x-2">
        <div className="text-gray-400 text-xs">Posted by {post.username}</div>
        <div className="text-gray-400">·</div>
        <div className="text-gray-400 text-xs">{createdAt}</div>
      </Flex>
      <div className="text-2xl text-bold font-semibold">
        {post.url ? <a href={post.url}>{post.title}</a> : <>{post.title}</>}
      </div>
      <div>{post.body}</div>

      <div className="flex items-center justify-between">
        <Link
          id="comment-link"
          to={`/posts/${post._id}`}
          className="text-gray-400 hover:text-gray-500 flex items-center gap-x-1"
        >
          <ChatAltIcon className="w-4 h-4" />
          <div>{numComments} comments</div>
        </Link>
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
  );
};

export default PostItem;
