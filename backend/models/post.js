const mongoose = require("mongoose");

// TODO: add upvotes/downvotes
const replySchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const commentSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String, required: true },
    replies: [replySchema],
  },
  { timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    url: { type: String },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
