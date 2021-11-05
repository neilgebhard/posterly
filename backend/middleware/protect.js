const jwt = require("express-jwt");

const protect = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  issuer: "api.posts",
  audience: "api.posts",
  getToken: (req) => req.cookies.token,
});

module.exports = protect;
