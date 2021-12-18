const dotenv = require("dotenv");
const users = require("./data/users.js");
const posts = require("./data/posts.js");
const User = require("./models/user.js");
const Post = require("./models/post.js");

const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePosts = posts.map((post) => {
      post.comments = post.comments.map((comment) => {
        return { ...comment, user: adminUser };
      });
      return { ...post, user: adminUser };
    });

    await Post.insertMany(samplePosts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
