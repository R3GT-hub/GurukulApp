const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Resources =require("./models/Resources");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const uploadMiddleware = multer({ dest: "uploads/" }); // Check the destination folder path
const secret = "saranshsdemicrosoft";
mongoose.connect(
  "mongodb+srv://saransh2002sharma:KnX9HiMxS8qomdCM@cluster0.tljzb6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/register", async (req, res) => {
  const { username, password,email } = req.body;
  console.log("req.body: ", username + " " + email+" "+password);
  try {

    const hashPass =  bcrypt.hashSync(password, 10);
    const userDoc = await User.create({
      username,
      email,
      password: hashPass,
    });
    console.log("userDoc: ",userDoc);
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
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

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content,cloudpath ,website} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      cloudpath,
      content,
      cover: newPath,
      website:website,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.post("/resources", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content,cloudpath ,website} = req.body;
    const postDoc = await Resources.create({
      title,
      summary,
      cloudpath,
      content,
      cover: newPath,
      website:website,
      author: info.id,
    });

    res.json(postDoc);
  });
});


app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
  redirect('/');
});

app.get("/post", async (req, res) => {
  res.json(await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20));
});


app.get('/post/:id',async (req,res)=>{
  const {id}=req.params;
  const postDoc=await Post.findById(id).populate('author',['username']);
  res.json(postDoc);
}
)

app.get("/resources", async (req, res) => {
  res.json(await Resources.find().populate('author',['username']).sort({createdAt:-1}).limit(20));
});


app.get('/resources/:id',async (req,res)=>{
  const {id}=req.params;
  const postDoc=await Resources.findById(id).populate('author',['username']);
  res.json(postDoc);
}
)
app.get('/',(req,res)=>{
  res.send("hi yash");
})
app.listen(4000,()=>{
  console.log(`Server Running on Port:4000 `)
});
