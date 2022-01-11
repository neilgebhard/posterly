import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/PostItem";
import { PlusCircleIcon } from "@heroicons/react/solid";
import type { Post as PostType } from "../types";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res: { data: PostType[] } = await axios.get("/api/posts");
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  const removePost = (id: string) => {
    const updatedPosts: PostType[] = posts.filter((post) => post._id !== id);
    setPosts(updatedPosts);
  };

  return (
    <main>
      <div className="bg-white border border-gray-300 md:rounded mb-4">
        <Link
          data-testid="create-post-link"
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
          <Post key={post._id} post={post} removePost={removePost} />
        ))}
      </ul>
    </main>
  );
};

export default Posts;
