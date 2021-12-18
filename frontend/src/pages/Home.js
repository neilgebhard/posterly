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
      <div className="bg-white border border-gray-300 md:rounded mb-4">
        <Link
          id="create-post-link"
          to="/create-post"
          className="flex items-center gap-x-1 m-2"
        >
          <PlusCircleIcon className="w-12 h-12 text-gray-300" />
          <input
            className="bg-gray-100 border border-gray-200 py-2 px-4 w-full hover:border-blue-600 rounded"
            type="text"
            placeholder="Create Post"
          />
        </Link>
      </div>
      <ul>
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            setPosts={setPosts}
            removePost={removePost}
          />
        ))}
      </ul>
    </main>
  );
};

export default Posts;
