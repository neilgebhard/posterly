const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");

dotenv.config();

const attachUser = require("./middleware/attachUser");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

connectDb();

let app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

app.use("/api", authRoutes);
app.use("/api", postRoutes);

const __basedir = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__basedir, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__basedir, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running.");
  });
}

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express started on port ${PORT}`);
});
