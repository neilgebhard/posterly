import { Link } from "react-router-dom";
import axios from "axios";
import CreatedAt from "./CreatedAt";
import IfUser from "./IfUser";
import Flex from "../ui/Flex";
import Votes from "./Votes";
import { ChatAltIcon, TrashIcon } from "@heroicons/react/outline";
import type { Post } from "../types";

type AppProps = {
  post: Post;
  removePost: (postId: string) => void;
};

const PostItem = ({ post, removePost }: AppProps) => {
  const handleDelete = async () => {
    await axios.delete(`/api/posts/${post._id}`);
    removePost(post._id);
  };

  const totalComments = post?.comments.reduce((total, comment) => {
    return total + comment.replies.length + 1;
  }, 0);

  return (
    <li
      key={post._id}
      className="bg-white md:rounded border border-gray-300 hover:border-gray-500 flex mb-3"
    >
      <Votes post={post} />
      <Link to={`/posts/${post._id}`}>
        <div className="p-2">
          <div className="text-gray-400 text-xs mb-2">
            Posted by u/{post.username} <CreatedAt createdAt={post.createdAt} />
          </div>
          <h2 className="text-xl font-medium">
            {post.url ? <a href={post.url}>{post.title}</a> : <>{post.title}</>}
          </h2>
          <Flex className="justify-between">
            <div className="text-gray-400 hover:text-gray-500 flex items-center gap-x-1">
              <ChatAltIcon className="w-5 h-5" />
              <div className="text-xs font-semibold">
                {totalComments} Comments
              </div>
            </div>
            <IfUser username={post.username}>
              <Flex
                id="delete-btn"
                className="text-gray-400 hover:text-gray-500 cursor"
                role="button"
                onClick={handleDelete}
              >
                <TrashIcon className="w-4 h-4" />
                <span>delete</span>
              </Flex>
            </IfUser>
          </Flex>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
