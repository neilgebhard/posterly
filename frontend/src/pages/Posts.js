import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <div>
            {post.url ? <a href={post.url}>{post.title}</a> : <>{post.title}</>}
          </div>
          <div>{post.body}</div>
          <div>
            <a href={`/post/${post._id}`}>comments {post.comments.length}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
