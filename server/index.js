const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Resources = require("./models/Resources");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const dotenv=require("dotenv");
const app = express();

dotenv.config();
app.use(cors({ credentials: true, origin: "https://gurukulapp-frontend.onrender.com/" }));
app.use(express.json());
app.use(cookieParser());

const uploadMiddleware = multer({ dest: "uploads/" });
const secret = process.env.secret;

const connect = async () => {
  await mongoose.connect(
    process.env.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Mongodb connected");
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }
  jwt.verify(token, secret, (err, info) => {
    if (err) {
      return res.status(403).json({ error: "Token is invalid" });
    }
    req.user = info;
    next();
  });
};

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log("req.body: ", username + " " + email + " " + password);
  try {
    let isAdmin = false;
    if (username === "yashpredator" || username === "saransh") isAdmin = true;
    const hashPass = bcrypt.hashSync(password, 10);
    const userDoc = await User.create({
      username,
      email,
      password: hashPass,
      isAdmin: isAdmin,
    });
    console.log("userDoc: ", userDoc);
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json("wrong credentials");
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/post", uploadMiddleware.single("file"), verifyToken, async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content, cloudpath, website } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    cloudpath,
    content,
    cover: newPath,
    website: website,
    author: req.user.id,
  });

  res.json(postDoc);
});

app.post("/resources", uploadMiddleware.single("file"), verifyToken, async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content, cloudpath, website } = req.body;
  const postDoc = await Resources.create({
    title,
    summary,
    cloudpath,
    content,
    cover: newPath,
    website: website,
    author: req.user.id,
  });

  res.json(postDoc);
});

app.get("/profile", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const userDoc = await User.findById(req.user.id);
  res.json({ username: userDoc.username, isAdmin: userDoc.isAdmin });
});
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.get("/resources", async (req, res) => {
  res.json(
    await Resources.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/resources/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Resources.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(400).json("Cannot delete the post");
  }
});

app.get("/", (req, res) => {
  res.send("Gurukul Server");
});

app.listen(4000, () => {
  connect();
  console.log(`Server Running on Port:4000`);
});
