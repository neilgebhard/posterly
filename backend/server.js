require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const attachUser = require("./middleware/attachUser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    let app = express();
    app.use(morgan("combined"));
    app.use(
      cors({
        origin: ["http://localhost:3000"],
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(attachUser);

    app.use("/api", authRoutes);
    app.use("/api", postRoutes);

    const __dirname = path.resolve();
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "/frontend/build")));

      app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
      );
    } else {
      app.get("/", (req, res) => {
        res.send("API is running....");
      });
    }

    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send({ error: err.message });
    });

    app.use(function (req, res) {
      res.status(404);
      res.send({ error: "Can't be found!" });
    });

    app.listen(PORT, () => {
      console.log(`Express started on port ${PORT}`);
    });
  });
