const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// @route    post /signup
// @desc     Create a user
// @access   Public
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = await User.create(req.body);
    if (user) {
      const token = await user.generateToken();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      });
      const { _id, username, email, isAdmin } = user;
      res.status(201).json({ _id, username, email, isAdmin });
    } else {
      res
        .status(400)
        .json({ message: "There was a problem creating the account." });
    }
  })
);

// @route    post /login
// @desc     Login a user
// @access   Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (await user?.matchPassword(password)) {
      const token = await user.generateToken();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      });
      const { _id, username, email, isAdmin } = user;
      res.json({ _id, username, email, isAdmin });
    } else {
      return res.status(401).json({ message: "Authentication failed." });
    }
  })
);

// Logout a user
router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "User has successfully logged out." });
});

module.exports = router;
