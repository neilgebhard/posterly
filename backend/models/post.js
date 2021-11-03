const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String },
  username: { type: String, required: true },
  comments: [
    {
      text: String,
      username: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", schema);
