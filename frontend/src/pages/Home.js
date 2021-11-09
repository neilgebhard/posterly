import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { PlusCircleIcon } from "@heroicons/react/solid";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    };

    fetchData();
  }, []);

  const removePost = (id) => {
    const updatedPosts = posts.filter((post) => post._id !== id);
    setPosts(updatedPosts);
  };

  return (
    <main>
      <h1>
        <Link
          id="create-post-link"
          to="/create-post"
          className="flex items-center gap-x-1"
        >
          <PlusCircleIcon className="w-8 h-8" /> Create a Post
        </Link>
      </h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} removePost={removePost} />
      ))}
    </main>
  );
};

export default Posts;
