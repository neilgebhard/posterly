const express = require("express");
const router = express.Router();
const jwtDecode = require("jwt-decode");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
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
      const { username, email } = user;
      res.status(201).json({ username, email });
    } else {
      res
        .status(400)
        .json({ message: "There was a problem creating the account." });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (await user?.matchPassword(password)) {
        const token = await user.generateToken();
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        });
        const { username, email } = user;
        res.json({ username, email });
      } else {
        return res.status(401).json({ message: "Authentication failed." });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: "There was a problem logging in." });
    }
  })
);

router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "User has successfully logged out." });
});

module.exports = router;
