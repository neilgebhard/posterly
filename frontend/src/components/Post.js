import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import CreatedAt from "./CreatedAt";
import Flex from "../ui/Flex";
import { ChatAltIcon, TrashIcon } from "@heroicons/react/solid";

const PostItem = ({ post, removePost }) => {
  const { username } = useAuth().auth;

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${post._id}`);
    removePost(post._id);
  };

  const numComments = post?.comments.reduce((acc, comment) => {
    return acc + comment.replies.length + 1;
  }, 0);

  const isByUser = post.username === username;

  return (
    <li key={post._id} className="bg-white p-4 mb-4 rounded">
      <Flex className="gap-x-2">
        <div className="text-gray-400 text-xs">Posted by {post.username}</div>
        <div className="text-gray-400">·</div>
        <CreatedAt createdAt={post.createdAt} />
      </Flex>
      <h3 className="text-2xl text-bold font-semibold">
        {post.url ? <a href={post.url}>{post.title}</a> : <>{post.title}</>}
      </h3>
      <p>{post.body}</p>

      <Flex className="justify-between">
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
      </Flex>
    </li>
  );
};

export default PostItem;
