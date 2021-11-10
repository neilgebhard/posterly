const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/protect");
const Post = require("../models/post");

// TODO:
// update post

// update comment

// update reply

// add search, pagination

// Get all posts
router.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  })
);

// Get a post
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

// Create a post
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

// Delete a post
router.delete(
  "/posts/:postId",
  asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId);

    if (post) {
      await post.remove();
      res.json({ message: "Post removed" });
    } else {
      return res.status(404).json({ message: "Post doesn't exist." });
    }
  })
);

// Create a comment
router.post(
  "/posts/:postId/comments",
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

// Delete a comment
router.delete(
  "/posts/:postId/comments/:commentId",
  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (post) {
      post.comments.id(commentId).remove();
      await post.save();
      res.json({ message: "Comment removed" });
    } else {
      return res.status(404).json({ message: "Post doesn't exist." });
    }
  })
);

// Create a reply
router.post(
  "/posts/:postId/comments/:commentId/replies",
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

// Delete a reply
router.delete(
  "/posts/:postId/comments/:commentId/replies/:replyId",
  asyncHandler(async (req, res) => {
    const { postId, commentId, replyId } = req.params;

    const post = await Post.findById(postId);
    if (post) {
      post.comments.id(commentId).replies.id(replyId).remove();
      await post.save();
      res.json({ message: "Reply removed" });
    } else {
      return res.status(404).json({ message: "Post doesn't exist." });
    }
  })
);

module.exports = router;
