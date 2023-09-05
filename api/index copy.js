require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./database/models/user");
const Post = require("./database/models/post");
const { createRandomUser } = require("./seed");
const { faker } = require("@faker-js/faker");
const ConnectDb = require("./database/dbConnection");
const port = 3000;
ConnectDb();

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.listen(port, () => console.log("listening on port " + port));

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rajkumarabothu670@gmail.com",
      pass: "jmyjymotatflelvd",
    },
  });

  const mailOptions = {
    from: "threads.com",
    to: email,
    subject: "Verification",
    text: `please click the verification link to verify your email http://localhost:3000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("mail sent successfully");
  } catch (error) {
    console.log(error, "error sending email");
  }
};

const genrateSecretKey = () => {
  const key = crypto.randomBytes(32).toString("hex");
  return key;
};
//end point to rqgister

app.post("/register", async (req, res) => {
  console.log("register api called");
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: email });
    if (existing) {
      return res.status(400).json({ messae: "Email already exists" });
    }
    const newUser = new User({ email, name, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({
      message: "Verification otp send successfully",
    });
  } catch (e) {
    res.status(500).json({ message: "Error registering" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified Successfully" });
  } catch (error) {
    console.log("error email verification", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

app.post("/login", async (req, res) => {
  console.log("/login api request");
  console.log(req.body);

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: " passwords do not match" });
    }

    const secretKey = genrateSecretKey();
    const token = jwt.sign({ Userid: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log("error login", error);
    res.status(500).json({ message: " login failed" });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await User.find({ _id: { $ne: userId } });
    return res.status(200).json({ users: result });
  } catch (error) {
    console.log("error fetch users", error);
    res.status(500).json({ message: " Error fetching users" });
  }
});

app.post("/user/send-follow", async (req, res) => {
  console.log("/send-follow sending request");
  console.log(req.body);
  try {
    const { currentUser, receiveUser } = req.body;
    const current_user = User.findOne({ _id: currentUser });
    const receive_user = User.findOne({ _id: receiveUser });
    if (!current_user || !receive_user) {
      return res.send(404).json({ message: "user not found" });
    }

    await User.findByIdAndUpdate(currentUser, {
      $push: { followers: receiveUser },
    });

    return res.json({ message: "Follow request sent successfully" });
  } catch (error) {
    console.log("error sending follow request", error);
  }
});
app.get("/user/profile/:id", async (req, res) => {
  console.log("/profile/:id sending request");
  try {
    const { id } = req.params;
    const current_user = await User.findById(id);

    return res.json(current_user);
  } catch (error) {
    console.log("error sending follow request", error);
  }
});

app.get("/user/:id/threads", async (req, res) => {
  console.log("/:id/threads sending request");
  try {
    const { id } = req.params;
    const user_threads = await Post.find({ user: id })
      .populate("user")
      .populate("replies.user", "name profilePicture");

    return res.json(user_threads);
  } catch (error) {
    console.log("error sending follow request", error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate("replies.user", "name profilePicture");
    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error fetching posts", error);
    return res.status(500).json({ message: "Error fetching posts" });
  }
});

app.post("/api/faker/user", async (req, res) => {
  try {
    const users = new Array(50).fill(null).map(() => createRandomUser());
    await User.insertMany(users);
    res.json(users);
  } catch (error) {
    console.log("error seeding fake users", error);
    return res.json({ message: " error seeding fake users" });
  }
});

app.post("/api/faker/post", async (req, res) => {
  try {
    const users = await User.find();
    const likes = new Array(Math.floor(Math.random() * 51))
      .fill(null)
      .map(() => users[Math.floor(Math.random() * 51)]._id);

    const comments = new Array(Math.floor(Math.random() * 51))
      .fill(null)
      .map(() => {
        return {
          user: users[Math.floor(Math.random() * 51)]._id,
          content: faker.lorem.lines({ min: 1, max: 3 }),
          image: Math.random() > 0.8 ? faker.image.url() : null,
          createdAt: faker.date.anytime(),
        };
      });

    const posts = new Array(50).fill(null).map((_) => {
      return {
        content: faker.lorem.paragraph(),
        image: Math.random() > 0.5 ? faker.image.url() : null,
        user: users[Math.floor(Math.random() * 51)]._id,
        likes: likes,
        likesCount: likes.length,
        replies: comments,
        repliesCount: comments.length,
        createdAt: faker.date.anytime(),
      };
    });
    Post.insertMany(posts);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
