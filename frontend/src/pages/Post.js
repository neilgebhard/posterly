import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import CreateComment from "../components/CreateComment";
import PostItem from "../components/PostItem";
import Comment from "../components/Comment";
import Error from "../ui/Error";

const Post = () => {
  const { _id: postId } = useParams();
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        const { data } = e.response;
        setError(data.message);
      }
    };

    fetchData();
  }, [postId]);

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Comments</h1>
      {post && <PostItem post={post} />}
      {error && <Error error={error} />}
      {isAuthenticated && (
        <CreateComment postId={post?._id} setPost={setPost} />
      )}
      {post?.comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          postId={post._id}
          setPost={setPost}
        />
      ))}
    </main>
  );
};

export default Post;
