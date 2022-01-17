import { Link } from "react-router-dom";
import axios from "axios";
import CreatedAt from "./CreatedAt";
import IfUser from "./IfUser";
import Flex from "./Flex";
import Votes from "./Votes";
import { ChatAltIcon, TrashIcon } from "@heroicons/react/outline";
import type { Post } from "../types";

type Props = {
  post: Post;
  isPostPage?: boolean;
  removePost?: (postId: string) => void;
};

const PostItem = ({ post, removePost, isPostPage }: Props) => {
  const handleDelete = async () => {
    await axios.delete(`/api/posts/${post._id}`);
    if (removePost) removePost(post._id);
  };

  const totalComments = post.comments?.reduce((total, comment) => {
    return total + comment.replies.length + 1;
  }, 0);

  return (
    <li
      key={post._id}
      className="bg-white md:rounded border border-gray-300 hover:border-gray-500 flex mb-3"
    >
      <Votes post={post} />
      <div className="p-2">
        <div className="text-gray-400 text-xs mb-2">
          Posted by u/{post.username} <CreatedAt createdAt={post.createdAt} />
        </div>
        <h2 className="text-xl font-medium hover:underline">
          {post.url ? (
            <a href={post.url}>{post.title}</a>
          ) : (
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          )}
        </h2>
        {isPostPage && post.body && (
          <p className="mb-2 border py-2 px-1 rounded">{post.body}</p>
        )}
        <Flex className="justify-between">
          <Link data-testid="comments-link" to={`/posts/${post._id}`}>
            <div className="text-gray-400 hover:text-gray-500 flex items-center gap-x-1">
              <ChatAltIcon className="w-5 h-5" />
              <div className="text-xs font-semibold hover:underline">
                {totalComments} Comments
              </div>
            </div>
          </Link>
          {!isPostPage && (
            <IfUser username={post.username}>
              <Flex
                data-testid="delete-post"
                className="text-gray-400 hover:text-gray-500 hover:underline cursor text-sm font-semibold"
                role="button"
                onClick={handleDelete}
              >
                <TrashIcon className="w-4 h-4" />
                <span>delete</span>
              </Flex>
            </IfUser>
          )}
        </Flex>
      </div>
    </li>
  );
};

export default PostItem;
