const jwtDecode = require("jwt-decode");

const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decodedToken = jwtDecode(token);
    const { _id, email, username } = decodedToken;
    req.user = {
      _id,
      email,
      username,
    };
  }
  next();
};

module.exports = attachUser;
