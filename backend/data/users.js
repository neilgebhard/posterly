const bcrypt = require("bcryptjs");

const users = [
  {
    username: "wile1234",
    email: "neil@gmail.com",
    password: bcrypt.hashSync("default12", 10),
    isAdmin: true,
  },
  {
    username: "LeastGorgon671",
    email: "john@example.com",
    password: bcrypt.hashSync("default12", 10),
  },
  {
    username: "SubduralHematoma670",
    email: "jane@example.com",
    password: bcrypt.hashSync("default12", 10),
  },
];

module.exports = users;
