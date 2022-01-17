import { useState } from "react";
import axios from "axios";
import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../context/Auth";
import type { Post } from "../types";

type Props = {
  post: Post;
};

const Votes = ({ post }: Props) => {
  const { auth, isAuthenticated } = useAuth();
  const [votes, setVotes] = useState(
    () => post.upvotes.length - post.downvotes.length
  );

  const [isUpvoted, setUpvoted] = useState(() =>
    post.upvotes.includes(auth._id)
  );
  const [isDownvoted, setDownvoted] = useState(() =>
    post.downvotes.includes(auth._id)
  );

  const handleUpvote = async () => {
    if (!isAuthenticated()) return;

    if (isUpvoted) {
      setVotes((votes) => votes - 1);
      setUpvoted(false);
      await axios.post(`/api/posts/${post._id}/upvote/cancel`);
    } else if (isDownvoted) {
      setVotes((votes) => votes + 2);
      setUpvoted(true);
      setDownvoted(false);
      await axios.post(`/api/posts/${post._id}/upvote`);
    } else {
      setVotes((votes) => votes + 1);
      setUpvoted(true);
      await axios.post(`/api/posts/${post._id}/upvote`);
    }
  };

  const handleDownvote = async () => {
    if (!isAuthenticated()) return;

    if (isDownvoted) {
      setVotes((votes) => votes + 1);
      setDownvoted(false);
      await axios.post(`/api/posts/${post._id}/downvote/cancel`);
    } else if (isUpvoted) {
      setVotes((votes) => votes - 2);
      setUpvoted(false);
      setDownvoted(true);
      await axios.post(`/api/posts/${post._id}/downvote`);
    } else {
      setVotes((votes) => votes - 1);
      setDownvoted(true);
      await axios.post(`/api/posts/${post._id}/downvote`);
    }
  };

  const upArrowColor = isUpvoted ? "text-orange" : "text-gray-400";
  const downArrowColor = isDownvoted ? "text-orange" : "text-gray-400";

  return (
    <div className="bg-gray-100 flex flex-col items-center py-2 px-1 rounded-tl rounded-bl">
      <button onClick={handleUpvote} title="Upvote">
        <ArrowCircleUpIcon className={`w-8 h-8 ${upArrowColor}`} />
      </button>
      <div className="text-lg font-medium">{votes < 0 ? 0 : votes}</div>
      <button onClick={handleDownvote} title="Upvote">
        <ArrowCircleDownIcon className={`w-8 h-8 ${downArrowColor}`} />
      </button>
    </div>
  );
};

export default Votes;
