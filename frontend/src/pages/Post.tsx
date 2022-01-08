import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import CreateComment from "../components/CreateComment";
import PostItem from "../components/Post";
import Comment from "../components/Comment";
import Error from "../components/Error";
import type { Post as PostType } from "../types";

const Post = () => {
  const { _id: postId } = useParams<{ _id: string }>();
  const isAuthenticated = useAuth().isAuthenticated();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState("");

  const fetchPost = useCallback(async () => {
    try {
      const res: { data: PostType } = await axios.get(`/api/posts/${postId}`);
      setPost(res.data);
    } catch (e: any) {
      const { data } = e.response;
      setError(data.message);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <main>
      {post && <PostItem post={post} isPostPage={true} />}
      {error && <Error error={error} />}
      {isAuthenticated && post ? (
        <CreateComment postId={post?._id} setPost={setPost} />
      ) : (
        <div className="flex flex-col gap-y-3 text-center sm:justify-between sm:flex-row bg-white border border-gray-300 py-3 px-2 mb-3">
          <p className="text-gray-500">Log in or sign up to leave a comment</p>
          <div>
            <Link
              to="/login"
              className="text-base border-blue-600 text-blue-600 border-2 px-5 py-1 rounded-full"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-white text-base hover:text-white bg-blue-600 hover:bg-blue-500 active:bg-indigo-400 px-5 py-1 ml-2 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
      <ul className="bg-white border border-gray-300 p-4">
        {post?.comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={post._id}
            fetchPost={fetchPost}
          />
        ))}
      </ul>
    </main>
  );
};

export default Post;
