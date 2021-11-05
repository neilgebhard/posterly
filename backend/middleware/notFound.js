const notFound = (req, res, next) => {
  res.status(404).json({ message: "URL can't be found!" });
};

module.exports = notFound;
