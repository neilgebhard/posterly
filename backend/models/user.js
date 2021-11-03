const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.generateToken = async function () {
  const { _id, email, username } = this;

  return jwt.sign(
    { _id, email, username, iss: "api.posts", aud: "api.posts" },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "60d",
    }
  );
};

schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", schema);
