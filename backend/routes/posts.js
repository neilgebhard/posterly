const express = require("express");
const router = express.Router();
const jwtDecode = require("jwt-decode");
const jwt = require("express-jwt");
const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");

const checkJwt = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  issuer: "api.posts",
  audience: "api.posts",
  getToken: (req) => req.cookies.token,
});

router.get("/post/:_id", async (req, res) => {
  const { _id } = req.params;
  const post = await Post.findOne({ _id });
  res.json(post);
});

router.post("/post/:_id/comment", async (req, res) => {
  const { _id } = req.params;
  const { text } = req.body;
  const { username } = req.user;
  const post = await Post.findOneAndUpdate(
    { _id },
    { $push: { comments: { text, username } } }
  );
  await post.save();
  res.json(post);
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post("/posts", checkJwt, async (req, res) => {
  const { title, body, url } = req.body;
  const { _id, username, email } = req.user;
  const post = new Post({
    ...req.body,
    username,
  });
  await post.save();
  res.json(post);
});

module.exports = router;
