const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require ("bcrypt")
const { validationSignUpData } = require('./utils/validation.js'); // ✅ example path
const cookieParser = require ('cookie-parser')
const {userAuth} = require ('./middlewares/auth.js')
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser())


app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validationSignUpData(req); // ✅ Corrected

    // Destructure values from body
    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({emailId});
    
    if (existingUser) {
      return res.status(409).send("User with this email already exists")
    }
    
    // Encrypt password
    const passwordHash  = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    

    // Create new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });

    // Save user to DB
    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(404).send("Error saving the user: " + error.message);
  }
});


app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {

      //Create a JWT Token
      const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790")
      console.log(token);
      
      // Add the token cookie and send the response back to the user

      res.cookie("token", token );
      res.send("Login Successful!")
    } else {
      throw new Error("Invalid credentials")
    }
  } catch (error) {
    res.status(500).send("ERROR:" + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
      const user = req.user; // Middleware ne yeh set kiya hai
      res.send(user); // ✅ Send once, no res.send after this
  } catch (error) {
      return res.status(500).send("ERROR : " + error.message); // ✅ return here too
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //Sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " Sent the connect request!")
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
