import axios from "axios";
import CreatedAt from "./CreatedAt";
import IfUser from "./IfUser";
import Flex from "./Flex";
import { TrashIcon } from "@heroicons/react/solid";
import { Reply as ReplyType } from "../types";

type Props = {
  reply: ReplyType;
  fetchPost: () => void;
  postId: string;
  commentId: string;
};

const Reply = ({ reply, fetchPost, postId, commentId }: Props) => {
  const handleDelete = async () => {
    await axios.delete(
      `/api/posts/${postId}/comments/${commentId}/replies/${reply._id}`
    );
    fetchPost();
  };

  return (
    <li key={reply._id} className="ml-10 bg-white pr-4">
      <Flex className="gap-x-2">
        <div className="text-sm font-semibold">{reply.username}</div>
        <div className="text-gray-400">·</div>
        <CreatedAt createdAt={reply.createdAt} />
      </Flex>
      <p>{reply.text}</p>
      <IfUser username={reply.username}>
        <Flex className="justify-end">
          <Flex
            data-testid="delete-reply"
            className="text-gray-400 hover:text-gray-500 cursor"
            role="button"
            onClick={handleDelete}
          >
            <TrashIcon className="w-4 h-4" />
            <span>delete</span>
          </Flex>
        </Flex>
      </IfUser>
    </li>
  );
};

export default Reply;
