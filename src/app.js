const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');
const userRouter = require("./routes/user.js");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)


// Get user by email
app.get("/user", async (req, res) => {
  const { age } = req.body;
  console.log(age);
  try {
    const user = await User.find({ age });
    console.log(user);
    if (user.length === 0) {
      res.status(404).send("User is not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

//Delete a user from the database
app.delete("/delete/:id", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({_id: userId});
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "about",
      "gender",
      "age",
      "firstName",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more then 10");
    }

    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("Updated the successfully!");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is Successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...");
  });
