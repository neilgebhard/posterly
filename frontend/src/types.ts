export type Post = {
  _id: string;
  username: string;
  user: string;
  title: string;
  comments: Comment[];
  upvotes: string[];
  downvotes: null[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  _id: string;
  username: string;
  user: string;
  text: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
};

export type Reply = {
  _id: string;
  username: string;
  user: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};
