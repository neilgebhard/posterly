const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/protect");
const Post = require("../models/post");

// @route    get /posts
// @desc     Get all posts
// @access   Public
router.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  })
);

// @route    get /posts/:postId
// @desc     Get a post
// @access   Public
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

// @route    post /posts
// @desc     Create a post
// @access   Private
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

// @route    delete /posts/:postId
// @desc     Delete a post
// @access   Private
router.delete(
  "/posts/:postId",
  protect,
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

// @route    post /posts/:postId/comments
// @desc     Create a comment
// @access   Private
router.post(
  "/posts/:postId/comments",
  protect,
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

// @route    post /posts/:postId/comments/:commentId
// @desc     Delete a comment
// @access   Private
router.delete(
  "/posts/:postId/comments/:commentId",
  protect,
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

// @route    post /posts/:postId/comments/:commentId/replies
// @desc     Create a reply
// @access   Private
router.post(
  "/posts/:postId/comments/:commentId/replies",
  protect,
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

// @route    delete /posts/:postId/comments/:commentId/replies/:replyId
// @desc     Delete a reply
// @access   Private
router.delete(
  "/posts/:postId/comments/:commentId/replies/:replyId",
  protect,
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

// @route    post /posts/:postId/upvote
// @desc     Upvote a post
// @access   Private
router.post(
  "/posts/:postId/upvote",
  protect,
  asyncHandler(async (req, res) => {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      {
        $addToSet: { upvotes: req.user._id },
        $pull: { downvotes: req.user._id },
      },
      { new: true }
    );

    res.json(post);
  })
);

// @route    post /posts/:postId/downvote
// @desc     Downvote a post
// @access   Private
router.post(
  "/posts/:postId/downvote",
  protect,
  asyncHandler(async (req, res) => {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      {
        $pull: { upvotes: req.user._id },
        $addToSet: { downvotes: req.user._id },
      },
      { new: true }
    );

    const posts = await Post.find();
    res.json(posts);
  })
);

// @route    post /posts/:postId/upvote/cancel
// @desc     Cancel an upvote
// @access   Private
router.post(
  "/posts/:postId/upvote/cancel",
  protect,
  asyncHandler(async (req, res) => {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      {
        $pull: { upvotes: req.user._id },
      },
      { new: true }
    );

    res.json(post);
  })
);

// @route    post /posts/:postId/downvote/cancel
// @desc     Cancel a downvote
// @access   Private
router.post(
  "/posts/:postId/downvote/cancel",
  protect,
  asyncHandler(async (req, res) => {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      {
        $pull: { downvotes: req.user._id },
      },
      { new: true }
    );

    res.json(post);
  })
);

module.exports = router;
