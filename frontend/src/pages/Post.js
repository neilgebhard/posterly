import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import CreateComment from "../components/CreateComment";
import PostItem from "../components/Post";
import Comment from "../components/Comment";
import Error from "../ui/Error";

const Post = () => {
  const { _id: postId } = useParams();
  const isAuthenticated = useAuth().isAuthenticated();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);
      setPost(res.data);
    } catch (e) {
      const { data } = e.response;
      setError(data.message);
    }
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <h1>Comments</h1>
      {post && <PostItem post={post} />}
      {error && <Error error={error} />}
      {isAuthenticated && (
        <CreateComment postId={post?._id} setPost={setPost} />
      )}
      <ul>
        {post?.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={post._id}
            setPost={setPost}
            fetchPost={fetchPost}
          />
        ))}
      </ul>
    </main>
  );
};

export default Post;
