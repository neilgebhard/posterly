import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
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

  return (
    <main>
      <h1>
        <Link to="/create-post" className="flex items-center gap-x-1">
          <PlusCircleIcon className="w-8 h-8" /> Create a Post
        </Link>
      </h1>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </main>
  );
};

export default Posts;
