import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateComment from "./CreateComment";

const Post = () => {
  const { _id } = useParams();
  const [post, setPost] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`/api/post/${_id}`);
    setPost(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Comments</h1>
      <div>{post?.title}</div>
      <div>{post?.body}</div>
      <div>Posted by {post?.username}</div>
      <CreateComment postId={post?._id} />
      {post?.comments.map((comment) => (
        <p>{comment.text}</p>
      ))}
    </>
  );
};

export default Post;
