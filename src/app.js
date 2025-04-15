const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require ("bcrypt")
const app = express();
app.use(express.json());

// app.post("/signup", async (req, res) => {
//   const userObje = new User(req.body);
//   console.log(userObje);
//   try {
//     const user = new User(userObje);
//     await user.save();
//     res.send("User Added successfully!");
//   } catch (error) {
//     res.status(404).send("Error saving the user:" + error.message);
//   }
// });

app.post("/signup", async (req, res) => {
  try {
    //! Validation of Data
    validationSingUpData(req);
    const {password} = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //! Creating a new instance of the User 
    const user = newUser({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    })
  } catch (error) {
    res.status(404).send("Error saving the user:" + error.message);
  }
})

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
      "skills"
    ]

    const isUpdateAllowed = Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key))

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more then 10")
    }

    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("Updated the successfully!");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

//Update data of the user
// app.patch('/user', async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     await User.findByIdAndUpdate({_id: userId},data);
//     res.send("User Updated Successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// })

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong-");
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
