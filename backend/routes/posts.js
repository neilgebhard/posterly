const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/protect");
const Post = require("../models/post");

// TODO:
// update post
// delete post

// delete comment
// update comment

// delete reply
// update reply

// add search, pagination
router.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  })
);

router.get(
  "/posts/:postId",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
);

router.post(
  "/posts",
  protect,
  asyncHandler(async (req, res) => {
    const { _id, username } = req.user;
    const post = new Post({
      username,
      user: _id,
      ...req.body,
    });
    await post.save();
    res.json(post);
  })
);

router.post(
  "/posts/:postId/comment",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const { username } = req.user;
    const post = await Post.findOne({ _id: postId });
    if (post) {
      post.comments.push({ text, username, user: req.user._id });
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      return res.status(404).json({ message: "Post doesn't exist." });
    }
  })
);

router.post(
  "/posts/:postId/comment",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const { username } = req.user;
    const post = await Post.findOne({ _id: postId });
    if (post) {
      post.comments.push({ text, username, user: req.user._id });
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      return res.status(404).json({ message: "Post doesn't exist." });
    }
  })
);

router.post(
  "/posts/:postId/comment/:commentId/reply",
  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const { username } = req.user;
    const post = await Post.findById(postId);
    if (post) {
      const comment = post.comments.id(commentId);
      comment.replies.push({ text, username, user: req.user._id });
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      return res.status(404).json({ message: "Post doesn't exist." });
    }
  })
);

module.exports = router;
