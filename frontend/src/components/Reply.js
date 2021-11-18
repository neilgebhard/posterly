import axios from "axios";
import { useAuth } from "../context/Auth";
import CreatedAt from "./CreatedAt";
import Flex from "../ui/Flex";
import { TrashIcon } from "@heroicons/react/solid";

const Reply = ({ reply, fetchPost, postId, commentId }) => {
  const { username } = useAuth().auth;
  const isByUser = reply.username === username;

  const handleDelete = async () => {
    await axios.delete(
      `/api/posts/${postId}/comments/${commentId}/replies/${reply._id}`
    );
    fetchPost();
  };

  return (
    <li key={reply._id} className="ml-10 bg-white p-4">
      <Flex className="gap-x-2">
        <div className="text-sm font-semibold">{reply.username}</div>
        <div className="text-gray-400">·</div>
        <CreatedAt createdAt={reply.createdAt} />
      </Flex>
      <p>{reply.text}</p>
      {isByUser && (
        <Flex className="justify-end">
          <Flex
            id="delete-btn"
            className="text-gray-400 hover:text-gray-500 cursor"
            role="button"
            onClick={handleDelete}
          >
            <TrashIcon className="w-4 h-4" />
            <span>delete</span>
          </Flex>
        </Flex>
      )}
    </li>
  );
};

export default Reply;
