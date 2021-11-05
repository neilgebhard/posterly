import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateComment from "./CreateComment";
import { useAuth } from "../../AuthContext";
import Comment from "./Comment";

const Post = () => {
  const { _id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/posts/${_id}`);
        setPost(res.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        const { data } = e.response;
        setError(data.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Comments</h1>
      <div>{post?.title}</div>
      <div>{post?.body}</div>
      <div>Posted by {post?.username}</div>
      {error && <div>error</div>}
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
    </>
  );
};

export default Post;
